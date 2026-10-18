"use client"

import { useRef, useState } from "react"
import { SimBadge } from "@/components/section"
import { SUGGERIMENTI, ROLE_SHORT, fmtEur, type Esito } from "@/lib/meridiane"
import { trackWidget } from "@/lib/track"

/* W7 · Il registro dei suggerimenti. Otto suggerimenti degli ultimi due mesi: cinque
   già decisi, tre da decidere. I contatori in alto si muovono con le scelte. */

const ESITI: Esito[] = ["accettato", "modificato", "rifiutato"]
const ESITO_CLASS: Record<Esito, string> = {
  accettato: "border-verde/60 bg-verde/10 text-verde-2",
  modificato: "border-ai/60 bg-ai/10 text-[#C2BDFA]",
  rifiutato: "border-border bg-[rgba(255,255,255,.04)] text-muted-foreground",
}

export function W7Registro() {
  const [scelte, setScelte] = useState<Record<number, Esito>>({})
  const toccate = useRef<Set<number>>(new Set())

  const esito = (id: number) => SUGGERIMENTI.find((s) => s.id === id)!.esito ?? scelte[id]
  const accettati = SUGGERIMENTI.filter((s) => esito(s.id) === "accettato")
  const valore = accettati.reduce((a, s) => a + s.valore, 0)

  const decide = (id: number, e: Esito) => {
    setScelte((m) => ({ ...m, [id]: e }))
    toccate.current.add(id)
    trackWidget("W7", "esito", { riga: id, esito: e, righe_toccate: toccate.current.size })
  }

  return (
    <div className="pai-panel">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <div className="font-display text-[1.05rem] font-semibold leading-none">Registro dei suggerimenti · Officine Meridiane</div>
          <div className="mt-1.5"><SimBadge /></div>
        </div>
        <div className="flex gap-5 font-mono text-[12px]" aria-live="polite">
          <div>
            <div className="text-muted-foreground">accettati</div>
            <div className="pai-tabular mt-0.5 text-[1.15rem] font-semibold text-foreground"><span key={accettati.length} className="pai-tick inline-block">{accettati.length}</span> <span className="text-muted-foreground">su {SUGGERIMENTI.length}</span></div>
          </div>
          <div>
            <div className="text-muted-foreground">valore degli accettati</div>
            <div className="pai-tabular mt-0.5 text-[1.15rem] font-semibold text-verde"><span key={valore} className="pai-tick inline-block">{fmtEur(valore)}</span></div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-[14px]">
          <thead>
            <tr className="border-b border-border font-mono text-[11px] tracking-[.04em] text-muted-foreground">
              <th className="px-5 py-2.5 font-normal">data</th>
              <th className="px-2 py-2.5 font-normal">manager</th>
              <th className="px-2 py-2.5 font-normal">suggerimento</th>
              <th className="px-2 py-2.5 text-right font-normal">valore stimato</th>
              <th className="px-5 py-2.5 font-normal">esito</th>
            </tr>
          </thead>
          <tbody>
            {SUGGERIMENTI.map((s) => {
              const fisso = Boolean(s.esito)
              const e = esito(s.id)
              return (
                <tr key={s.id} className={`border-b border-line-2 last:border-b-0 ${!fisso ? "bg-[rgba(255,255,255,.02)]" : ""}`}>
                  <td className="whitespace-nowrap px-5 py-3 font-mono text-[12px] text-muted-foreground">{s.data}</td>
                  <td className="px-2 py-3 font-mono text-[12px]">{ROLE_SHORT[s.role]}</td>
                  <td className="px-2 py-3 leading-[1.4]">{s.testo}</td>
                  <td className="pai-tabular whitespace-nowrap px-2 py-3 text-right font-mono text-[13px]">{fmtEur(s.valore)}</td>
                  <td className="px-5 py-3">
                    {fisso ? (
                      <span className={`inline-block rounded-full border px-2.5 py-1 font-mono text-[11px] ${ESITO_CLASS[e!]}`}>{e}</span>
                    ) : (
                      <div className="flex gap-1" role="radiogroup" aria-label={`Esito: ${s.testo}`}>
                        {ESITI.map((x) => {
                          const on = scelte[s.id] === x
                          return (
                            <button
                              key={x}
                              type="button"
                              role="radio"
                              aria-checked={on}
                              onClick={() => decide(s.id, x)}
                              className={`rounded-full border px-2.5 py-1 font-mono text-[11px] transition-colors ${on ? ESITO_CLASS[x] : "border-border text-muted-foreground hover:border-[rgba(255,255,255,.4)] hover:text-foreground"}`}
                            >
                              {x}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="border-t border-border px-5 py-3 font-mono text-[12px] text-muted-foreground">// le ultime tre righe le decidi tu</div>
    </div>
  )
}
