"use client"

import { useEffect, useRef, useState } from "react"
import { SimBadge } from "@/components/section"
import { AZIENDA, BRIEFINGS, ROLE_IDS, ROLE_SHORT, type Kpi, type RoleId } from "@/lib/meridiane"
import { trackWidget } from "@/lib/track"
import { prefersReducedMotion, useVisible } from "@/components/anim"

/* W1 · Il briefing del lunedì. Cinque tab, CFO aperto. Ciclo automatico ogni 8 s
   finché l'utente non tocca un tab; poi si ferma. Contenuto statico, nessuna rete.
   Senza JS resta visibile il briefing CFO (rendering lato server). */

const CYCLE_MS = 8000
const nowMs = () => Date.now()

const toneClass: Record<Kpi["tone"], string> = {
  up: "text-verde-2",
  down: "text-warn",
  warn: "text-warn",
  flat: "text-muted-foreground",
}
const toneMark: Record<Kpi["tone"], string> = { up: "▲", down: "▼", warn: "!", flat: "·" }

export function W1Briefing() {
  const [role, setRole] = useState<RoleId>("cfo")
  const [auto, setAuto] = useState(true)
  const { ref, visible } = useVisible<HTMLDivElement>(0.3)
  const openedAt = useRef(0)

  // Ciclo lento, in pausa quando il pannello non è visibile.
  useEffect(() => {
    if (!auto || !visible || prefersReducedMotion()) return
    const t = setTimeout(() => setRole((r) => ROLE_IDS[(ROLE_IDS.indexOf(r) + 1) % ROLE_IDS.length]), CYCLE_MS)
    return () => clearTimeout(t)
  }, [auto, visible, role])

  const pick = (r: RoleId) => {
    const now = nowMs()
    if (!auto && openedAt.current) trackWidget("W1", "tempo_tab", { ruolo: role, secondi: Math.round((now - openedAt.current) / 1000) })
    openedAt.current = now
    setAuto(false)
    setRole(r)
    trackWidget("W1", "tab", { ruolo: r })
  }

  const b = BRIEFINGS[role]

  return (
    <div ref={ref} className="pai-panel shadow-[0_30px_80px_-40px_rgba(0,204,178,.35)]">
      {/* barra finestra */}
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[rgba(255,255,255,.14)]" />
          <span className="size-2.5 rounded-full bg-[rgba(255,255,255,.14)]" />
          <span className="size-2.5 rounded-full bg-[rgba(255,255,255,.14)]" />
        </div>
        <span className="truncate font-mono text-[11px] text-muted-foreground">prodigious · briefing</span>
        <SimBadge />
      </div>

      {/* tab ruoli */}
      <div role="tablist" aria-label="Briefing per ruolo" className="relative flex border-b border-border font-mono text-[13px]">
        {ROLE_IDS.map((r) => {
          const on = r === role
          return (
            <button
              key={r}
              type="button"
              role="tab"
              id={`w1-tab-${r}`}
              aria-selected={on}
              aria-controls="w1-panel"
              onClick={() => pick(r)}
              className={`relative flex-1 px-2 py-3 transition-colors ${on ? "bg-ink-3 text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {ROLE_SHORT[r]}
              {on && (
                <span className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden bg-verde/30" aria-hidden>
                  {auto && visible && (
                    <span key={role} className="block h-full origin-left bg-verde [animation:pai-progress_8s_linear_forwards]" />
                  )}
                  {!auto && <span className="block h-full bg-verde" />}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div id="w1-panel" role="tabpanel" aria-labelledby={`w1-tab-${role}`} key={role} className="p-[clamp(16px,2.2vw,22px)] [animation:pai-tick_.35s_cubic-bezier(.16,1,.3,1)_both]">
        <div className="font-mono text-[12px] tracking-[.02em] text-muted-foreground">
          {AZIENDA.lunedi} <span className="opacity-60">·</span> {b.cadenza} <span className="opacity-60">·</span> {AZIENDA.nome}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {b.kpi.map((k) => (
            <div key={k.label} className="min-w-0 rounded-[10px] border border-border bg-ink p-[10px] sm:p-3">
              <div className="truncate font-mono text-[10.5px] text-muted-foreground" title={k.label}>{k.label}</div>
              <div className="pai-tabular mt-1.5 font-mono text-[clamp(.95rem,1.6vw,1.2rem)] font-semibold leading-tight text-foreground">{k.value}</div>
              <div className={`mt-1 font-mono text-[10.5px] leading-snug ${toneClass[k.tone]}`}>
                <span aria-hidden>{toneMark[k.tone]} </span>{k.delta}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 font-mono text-[11px] tracking-[.05em] text-verde">// da sapere</div>
        <ul className="mt-2 space-y-2">
          {b.daSapere.map((t) => (
            <li key={t} className="flex gap-2.5 text-[14.5px] leading-[1.45] text-foreground/90">
              <span className="mt-[7px] size-1.5 flex-none rounded-full bg-warn" aria-hidden />
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-5 rounded-[10px] border border-verde/60 bg-verde/10 p-3">
          <div className="font-mono text-[11px] tracking-[.05em] text-verde-2">// da fare questa settimana</div>
          <p className="mt-1 text-[15px] font-semibold leading-[1.4]">{b.daFare}</p>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[11px] text-muted-foreground">
          <span>fonti:</span>
          {b.fonti.map((f) => (
            <span key={f} className="inline-flex items-center gap-1.5">
              <span className="size-[6px] rounded-full bg-verde-2" aria-hidden />
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
