"use client"

import { useEffect, useState } from "react"
import { prefersReducedMotion, useVisible } from "@/components/anim"
import { trackWidget } from "@/lib/track"

/* W6 · Il contesto che si costruisce. Tre tappe (settimana 1, 2, 3), cliccabili o in
   autoplay (una volta, quando il widget entra in vista). Lo schema si popola:
   fonti → nodi di contesto → Company Brain e primo manager acceso. */

const TAPPE = [
  { label: "settimana 1", ce: "Collega le fonti: banca, fatture, CRM, gestionale. Legge tutto quello che c'è.", tu: "un incontro da un'ora: ci racconti come lavorate" },
  { label: "settimana 2", ce: "Mappa i processi, scrive il glossario dell'azienda, fissa obiettivi e soglie con te e con chi segue l'area.", tu: "niente: lavora da solo" },
  { label: "settimana 3", ce: "Chiude il contesto, controlla i numeri con te, accende il primo manager.", tu: "un incontro da un'ora: la prima fotografia reale" },
]

const FONTI = [
  { label: "banca", y: 46 },
  { label: "fatture", y: 112 },
  { label: "CRM", y: 188 },
  { label: "gestionale", y: 254 },
]
const NODI = [
  { label: "processi", x: 186, y: 52 },
  { label: "obiettivi", x: 334, y: 52 },
  { label: "soglie", x: 186, y: 248 },
  { label: "glossario", x: 334, y: 248 },
]
const C = { x: 260, y: 150 }

export function W6Contesto() {
  const [tappa, setTappa] = useState(2) // SSR / senza JS: schema completo
  const [auto, setAuto] = useState(true)
  const { ref, visible } = useVisible<HTMLDivElement>(0.4)

  useEffect(() => {
    if (prefersReducedMotion()) return
    setTappa(-1)
  }, [])

  useEffect(() => {
    if (!auto || !visible || tappa >= 2) return
    const t = setTimeout(() => setTappa((n) => n + 1), tappa < 0 ? 400 : 3200)
    return () => clearTimeout(t)
  }, [auto, visible, tappa])

  const pick = (i: number) => {
    setAuto(false)
    setTappa(i)
    trackWidget("W6", "tappa", { tappa: i + 1 })
  }

  const s1 = tappa >= 0
  const s2 = tappa >= 1
  const s3 = tappa >= 2
  const t = TAPPE[Math.max(0, tappa)]

  return (
    <div ref={ref}>
      <div role="tablist" aria-label="Le tre settimane di setup" className="grid grid-cols-3 gap-1.5">
        {TAPPE.map((x, i) => {
          const on = i <= tappa
          return (
            <button key={x.label} type="button" role="tab" aria-selected={i === tappa} onClick={() => pick(i)} className="group text-left">
              <span className={`block h-1 rounded-full transition-colors duration-500 ${on ? "bg-verde" : "bg-[rgba(255,255,255,.15)]"}`} />
              <span className={`mt-2 block font-mono text-[12px] transition-colors ${i === tappa ? "text-verde" : "text-muted-foreground group-hover:text-foreground"}`}>{x.label}</span>
            </button>
          )
        })}
      </div>

      <svg viewBox="0 0 520 300" className="mt-4 h-auto w-full" role="img" aria-label="Schema del contesto aziendale che si costruisce in tre settimane">
        {/* linee fonti → centro */}
        {FONTI.map((f) => (
          <line key={f.label} x1={86} y1={f.y} x2={C.x - 50} y2={C.y} stroke={s1 ? "var(--verde)" : "var(--line)"} strokeWidth={s1 ? 1.6 : 1} strokeDasharray={s1 ? "0" : "3 4"} className="transition-all duration-700" />
        ))}
        {FONTI.map((f) => (
          <g key={f.label}>
            <rect x={8} y={f.y - 14} width={78} height={28} rx={14} fill="var(--ink)" stroke={s1 ? "var(--verde)" : "var(--line)"} className="transition-colors duration-700" />
            <text x={47} y={f.y + 4} textAnchor="middle" className="fill-[var(--paper)] font-mono text-[11px]">{f.label}</text>
          </g>
        ))}

        {/* nodi di contesto */}
        {NODI.map((n) => (
          <g key={n.label} style={{ opacity: s2 ? 1 : 0, transition: "opacity .6s ease" }}>
            <line x1={n.x} y1={n.y} x2={C.x} y2={C.y} stroke="var(--ai)" strokeOpacity=".55" strokeWidth="1.2" />
            <rect x={n.x - 40} y={n.y - 13} width={80} height={26} rx={6} fill="var(--ink-3)" stroke="var(--ai)" strokeOpacity=".7" />
            <text x={n.x} y={n.y + 4} textAnchor="middle" className="fill-[var(--paper)] font-mono text-[11px]">{n.label}</text>
          </g>
        ))}

        {/* nucleo */}
        <circle cx={C.x} cy={C.y} r={50} fill="var(--ink-2)" stroke="var(--line)" />
        <circle
          cx={C.x} cy={C.y} r={50} fill="none" stroke="var(--verde-2)" strokeWidth="2.2" pathLength={1}
          strokeDasharray="1" strokeDashoffset={s3 ? 0 : 1} transform={`rotate(-90 ${C.x} ${C.y})`}
          style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(.65,0,.35,1)" }}
        />
        <text x={C.x} y={C.y - 3} textAnchor="middle" className={`font-display text-[13px] font-semibold transition-colors duration-500 ${s3 ? "fill-[var(--verde-2)]" : "fill-[var(--paper)]"}`}>Company</text>
        <text x={C.x} y={C.y + 13} textAnchor="middle" className={`font-display text-[13px] font-semibold transition-colors duration-500 ${s3 ? "fill-[var(--verde-2)]" : "fill-[var(--paper)]"}`}>Brain</text>

        {/* primo manager */}
        <line x1={C.x + 50} y1={C.y} x2={436} y2={C.y} stroke={s3 ? "var(--verde)" : "var(--line)"} strokeWidth={s3 ? 1.8 : 1} strokeDasharray={s3 ? "0" : "3 4"} className="transition-all duration-700" />
        <circle cx={466} cy={C.y} r={28} fill={s3 ? "var(--verde)" : "var(--ink)"} stroke={s3 ? "var(--verde)" : "var(--line)"} className="transition-all duration-700" style={s3 ? { filter: "drop-shadow(0 0 10px rgba(0,204,178,.6))" } : undefined} />
        <text x={466} y={C.y + 4} textAnchor="middle" className={`font-mono text-[12px] font-bold ${s3 ? "fill-[#06150E]" : "fill-[var(--muted-foreground)]"}`}>CFO</text>
        <text x={466} y={C.y + 46} textAnchor="middle" className="fill-[var(--muted-foreground)] font-mono text-[10px]">{s3 ? "in servizio" : "in attesa"}</text>
      </svg>

      <div className="mt-3 grid gap-3 sm:grid-cols-2" aria-live="polite">
        <div>
          <div className="font-mono text-[11px] tracking-[.05em] text-verde">il context engineer</div>
          <p className="mt-1 text-[14.5px] leading-[1.5]">{t.ce}</p>
        </div>
        <div>
          <div className="font-mono text-[11px] tracking-[.05em] text-muted-foreground">tu</div>
          <p className="mt-1 text-[14.5px] leading-[1.5] text-muted-foreground">{t.tu}</p>
        </div>
      </div>
    </div>
  )
}
