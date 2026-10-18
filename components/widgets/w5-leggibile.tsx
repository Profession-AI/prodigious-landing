"use client"

import { useState } from "react"
import { Arrow, BTN_PRIMARY } from "@/components/ui/cta"
import { FONTI, LEGGIBILITA, ARRICCHIMENTI, ROLE_IDS, ROLE_SHORT, type FonteId, type RoleId } from "@/lib/meridiane"
import { trackWidget, track } from "@/lib/track"
import { prefillForm } from "@/lib/prefill"
import { useVariants } from "@/components/session"
import { CTA_LABEL } from "@/lib/variants"

/* W5 · Quanto sei leggibile. Sei interruttori di fonti; i cinque manager si accendono
   in base a cosa hai. Il bottone porta al form con il manager e le fonti precompilati.
   Senza JS: gli interruttori sono checkbox nativi in una lista, leggibili comunque. */

/** Ordine con cui si consiglia da dove partire, se più manager sono accesi. */
const PRIORITA: RoleId[] = ["cfo", "cso", "cmo", "coo", "cto"]

const isOn = (r: RoleId, f: Set<FonteId>) => LEGGIBILITA[r].richiede.every((x) => f.has(x))

export function W5Leggibile() {
  const [fonti, setFonti] = useState<Set<FonteId>>(() => new Set(["banca", "fatture"]))
  const v = useVariants()

  const toggle = (id: FonteId) => {
    const next = new Set(fonti)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setFonti(next)
    trackWidget("W5", "interruttore", { fonte: id, attivo: next.has(id) })
  }

  const accesi = PRIORITA.filter((r) => isOn(r, fonti))
  const primo = accesi[0]
  const spenti = ROLE_IDS.filter((r) => !isOn(r, fonti))
  const mancanti = Array.from(new Set(spenti.flatMap((r) => LEGGIBILITA[r].richiede.filter((x) => !fonti.has(x)))))
  const label = (id: FonteId) => FONTI.find((f) => f.id === id)!.label

  const candidati = () => {
    const lista = Array.from(fonti)
    trackWidget("W5", "candidati", { fonti: lista.join(","), accesi: accesi.map((r) => ROLE_SHORT[r]).join(",") })
    track("cta_click", { posizione: "w5" })
    prefillForm({ manager: primo ? ROLE_SHORT[primo] : "Non so", fonti: lista.map(label), origine: "w5" }, false)
  }

  return (
    <div className="pai-panel">
      <div className="border-b border-border px-5 py-4">
        <div className="font-display text-[1.05rem] font-semibold leading-none">Quanto sei leggibile</div>
        <div className="mt-1.5 font-mono text-[12px] text-muted-foreground">// accendi quello che hai già: vedi chi può partire</div>
      </div>

      <div className="grid gap-6 p-[clamp(16px,2.4vw,24px)] md:grid-cols-[1fr_1.15fr]">
        <fieldset>
          <legend className="mb-3 font-mono text-[11px] tracking-[.05em] text-muted-foreground">i tuoi dati</legend>
          <div className="flex flex-col gap-2">
            {FONTI.map((f) => {
              const on = fonti.has(f.id)
              return (
                <label key={f.id} className={`flex cursor-pointer items-center justify-between gap-3 rounded-[10px] border px-3.5 py-2.5 transition-colors ${on ? "border-verde/60 bg-verde/5" : "border-border hover:border-[rgba(255,255,255,.3)]"}`}>
                  <span className="text-[15px]">{f.label}</span>
                  <input type="checkbox" role="switch" checked={on} onChange={() => toggle(f.id)} className="peer sr-only" />
                  <span aria-hidden className={`relative h-[22px] w-[40px] flex-none rounded-full transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-verde-2 ${on ? "bg-verde" : "bg-[rgba(255,255,255,.18)]"}`}>
                    <span className={`absolute top-[3px] size-4 rounded-full bg-ink transition-[left] duration-200 ${on ? "left-[21px]" : "left-[3px]"}`} />
                  </span>
                </label>
              )
            })}
          </div>
        </fieldset>

        <div>
          <div className="mb-3 font-mono text-[11px] tracking-[.05em] text-muted-foreground">i manager</div>
          <ul className="flex flex-col gap-2">
            {ROLE_IDS.map((r) => {
              const on = isOn(r, fonti)
              const extra = ARRICCHIMENTI[r]
              return (
                <li key={r} className={`flex items-center gap-3 rounded-[10px] border px-3 py-2.5 transition-colors duration-300 ${on ? "border-verde/50 bg-ink" : "border-dashed border-border"}`}>
                  <span className={`flex size-9 flex-none items-center justify-center rounded-full font-mono text-[11px] font-bold transition-all duration-300 ${on ? "bg-verde text-[#06150E] shadow-[0_0_16px_-2px_var(--verde)]" : "bg-[rgba(255,255,255,.08)] text-muted-foreground"}`}>
                    {ROLE_SHORT[r]}
                  </span>
                  <span className={`text-[14px] leading-[1.4] ${on ? "text-foreground" : "text-muted-foreground"}`}>
                    {on ? LEGGIBILITA[r].con : LEGGIBILITA[r].senza}
                    {on && extra && fonti.has(extra.fonte) && <span className="text-verde-2"> {extra.text}</span>}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-border px-[clamp(16px,2.4vw,24px)] py-5 md:flex-row md:items-center md:justify-between">
        <p className="max-w-[52ch] text-[1.02rem] leading-[1.5]" aria-live="polite">
          {primo ? (
            <>
              Con questi dati puoi partire dal <span className="font-semibold text-verde">{ROLE_SHORT[primo]}</span> domani.
              {mancanti.length > 0 && <> Gli altri si accendono quando colleghi {mancanti.map(label).join(", ")}.</>}
              {mancanti.length === 0 && <> Si accendono tutti e cinque.</>}
            </>
          ) : (
            <>Con questi dati non partiamo ancora. Banca e fatture elettroniche le hai per forza: si parte da lì.</>
          )}
        </p>
        <a href="#candidatura" onClick={candidati} className={`${BTN_PRIMARY} shrink-0 px-5 py-3 text-[15px]`}>
          {CTA_LABEL[v.cta]} con questa configurazione <Arrow />
        </a>
      </div>
    </div>
  )
}
