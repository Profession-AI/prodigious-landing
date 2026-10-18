"use client"

import { useRef, useState } from "react"
import { fmtEur } from "@/lib/meridiane"
import { PREZZI } from "@/lib/content"
import { trackWidget } from "@/lib/track"

/* W4 · Quanto costa guardare i numeri ogni giorno. Cursore sui dipendenti (10–100),
   barre a costo azienda mensile: tre riferimenti umani e Prodigious. Un manager
   Prodigious copre un'area intera, quindi si confronta sempre con UN manager
   (setup su 12 mesi + un canone), a ogni taglia.
   TODO(pubblicazione): cifre da fonti pubbliche (retribuzioni medie, tariffe di
   temporary management), citate sotto. Costo azienda ≈ RAL × 1,35 / 12. */

const prodigious = () => PREZZI.setupEur / 12 + PREZZI.canoneEur
const lerp = (n: number, a: number, b: number) => a + ((n - 10) / 90) * (b - a)
/** Responsabile di area interno a tempo pieno: RAL 55.000 → 85.000 € con la taglia. */
const fullTime = (n: number) => (lerp(n, 55_000, 85_000) * 1.35) / 12
/** Figura interna junior (es. controller): RAL 32.000 → 38.000 €. */
const junior = (n: number) => (lerp(n, 32_000, 38_000) * 1.35) / 12
/** Direttore part-time esterno (temporary management, 1–2 giorni a settimana). */
const partTime = (n: number) => lerp(n, 1_500, 3_000)

const MAX = 10_000

export function W4Cursore() {
  const [n, setN] = useState(32)
  const sent = useRef<ReturnType<typeof setTimeout> | null>(null)

  const change = (v: number) => {
    setN(v)
    if (sent.current) clearTimeout(sent.current)
    sent.current = setTimeout(() => trackWidget("W4", "cursore", { dipendenti: v }), 700)
  }

  const p = prodigious()
  const bars = [
    { label: "un responsabile di area a tempo pieno", sub: "costo azienda", value: fullTime(n), tone: "bg-[rgba(255,255,255,.22)]" },
    { label: "una figura interna junior", sub: "costo azienda", value: junior(n), tone: "bg-[rgba(255,255,255,.22)]" },
    { label: "un direttore part-time esterno", sub: "1–2 giorni a settimana", value: partTime(n), tone: "bg-[rgba(255,255,255,.22)]" },
    { label: "un manager Prodigious", sub: "setup su 12 mesi + canone", value: p, tone: "bg-verde" },
  ]
  const volte = Math.round(fullTime(n) / p)

  return (
    <div className="pai-panel">
      <div className="border-b border-border px-5 py-4">
        <div className="font-display text-[1.05rem] font-semibold leading-none">Quanto costa guardare i numeri ogni giorno</div>
        <div className="mt-1.5 font-mono text-[12px] text-muted-foreground">// sposta il cursore sulla tua taglia</div>
      </div>
      <div className="p-[clamp(16px,2.4vw,26px)]">
        <label className="flex items-baseline justify-between gap-3">
          <span className="font-mono text-[12px] text-muted-foreground">dipendenti</span>
          <span className="pai-tabular font-display text-[2rem] font-semibold leading-none">{n}</span>
        </label>
        <input type="range" min={10} max={100} step={1} value={n} onChange={(e) => change(Number(e.target.value))} className="pai-range mt-2" aria-label="Numero di dipendenti" />
        <div className="flex justify-between font-mono text-[11px] text-muted-foreground"><span>10</span><span>100</span></div>

        <div className="mt-6 flex flex-col gap-4">
          {bars.map((b) => (
            <div key={b.label}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[15px]">{b.label} <span className="font-mono text-[11px] text-muted-foreground">· {b.sub}</span></span>
                <span className="pai-tabular shrink-0 font-mono text-[15px] font-semibold">{fmtEur(b.value)}<span className="text-[11px] font-normal text-muted-foreground">/mese</span></span>
              </div>
              <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-[rgba(255,255,255,.06)]">
                <div className={`h-full rounded-full ${b.tone} transition-[width] duration-300 ease-out`} style={{ width: `${Math.min(100, (b.value / MAX) * 100)}%` }} />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-[1.05rem] leading-[1.5]">
          A <span className="pai-tabular font-semibold">{n}</span> dipendenti, un responsabile di area a tempo pieno costa circa <span className="pai-tabular font-semibold">{fmtEur(fullTime(n))}</span> al mese. Un manager Prodigious per la stessa area: <span className="pai-tabular font-semibold text-verde">{fmtEur(p)}</span>, circa <span className="font-semibold text-verde">{volte} volte meno</span>.
        </p>
        <p className="mt-4 font-mono text-[11px] leading-[1.6] text-muted-foreground">
          costo azienda = RAL × 1,35 / 12 · riferimenti: retribuzioni medie di responsabili di area e controller junior in PMI, tariffe di temporary management (fonti da inserire) · un manager Prodigious per area, a ogni taglia
        </p>
      </div>
    </div>
  )
}
