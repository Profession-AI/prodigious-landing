"use client"

import { useEffect, useRef, useState } from "react"
import { TypingDots, prefersReducedMotion, useVisible } from "@/components/anim"
import { SimBadge } from "@/components/section"
import { DECISIONI, ROLE_SHORT, type ChatMsg } from "@/lib/meridiane"
import { trackWidget } from "@/lib/track"

/* W3 · I manager si parlano. Scelta una decisione, i manager intervengono a turno
   (un messaggio ogni ~2,5 s, con "sta scrivendo"). L'ultimo è la sintesi per il titolare.
   Si ferma se il widget esce dallo schermo e riprende quando torna visibile.
   Senza JS (o con riduzione del movimento) mostra subito tutti i messaggi. */

const TYPING_MS = 1100
const READ_MS = 1500

const AVATAR: Record<string, string> = {
  cfo: "bg-verde text-[#06150E]",
  cmo: "bg-ai text-[#0B0A24]",
  cso: "bg-verde-2 text-[#06150E]",
  coo: "bg-warn text-[#1E1100]",
  cto: "bg-paper text-ink",
}

function Bubble({ m }: { m: ChatMsg }) {
  if (m.from === "sintesi") {
    return (
      <div className="rounded-[14px] border border-verde bg-verde/10 p-4 [animation:pai-tick_.35s_cubic-bezier(.16,1,.3,1)_both]">
        <div className="font-mono text-[11px] tracking-[.05em] text-verde-2">// sintesi per te</div>
        <p className="mt-1.5 text-[1.02rem] font-semibold leading-[1.5]">{m.text}</p>
      </div>
    )
  }
  return (
    <div className="flex items-start gap-3 [animation:pai-tick_.35s_cubic-bezier(.16,1,.3,1)_both]">
      <span className={`flex size-9 flex-none items-center justify-center rounded-full font-mono text-[11px] font-bold ${AVATAR[m.from]}`} aria-hidden>
        {ROLE_SHORT[m.from]}
      </span>
      <div className="min-w-0 flex-1 rounded-[14px] rounded-tl-[4px] border border-border bg-ink p-3.5">
        <div className="font-mono text-[11px] tracking-[.04em] text-muted-foreground">{ROLE_SHORT[m.from]} · manager virtuale</div>
        <p className="mt-1 text-[15px] leading-[1.55]">{m.text}</p>
      </div>
    </div>
  )
}

export function W3SiParlano() {
  const [sel, setSel] = useState(0)
  const [shown, setShown] = useState<number>(DECISIONI[0].msgs.length) // SSR: tutto visibile
  const [typing, setTyping] = useState(false)
  const [started, setStarted] = useState(false)
  const { ref, visible } = useVisible<HTMLDivElement>(0.35)
  const scroller = useRef<HTMLDivElement>(null)
  const dec = DECISIONI[sel]
  const total = dec.msgs.length
  const done = shown >= total

  // Al primo mount con JS: si riparte da zero, in attesa che il widget sia visibile.
  useEffect(() => {
    if (prefersReducedMotion()) return
    setShown(0)
  }, [])

  // Avanza un messaggio alla volta, solo quando il widget è visibile.
  useEffect(() => {
    if (!visible || done) return
    if (!started) setStarted(true)
    setTyping(true)
    const t1 = setTimeout(() => setTyping(false), TYPING_MS)
    const t2 = setTimeout(() => setShown((n) => n + 1), TYPING_MS + (shown === 0 ? 0 : READ_MS))
    return () => { clearTimeout(t1); clearTimeout(t2); setTyping(false) }
  }, [visible, shown, done, started])

  useEffect(() => {
    if (done && started) trackWidget("W3", "completata", { decisione: dec.id })
  }, [done, started, dec.id])

  useEffect(() => {
    const el = scroller.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [shown, typing])

  const choose = (i: number) => {
    setSel(i)
    setShown(prefersReducedMotion() ? DECISIONI[i].msgs.length : 0)
    trackWidget("W3", "decisione", { decisione: DECISIONI[i].id })
  }
  const replay = () => {
    setShown(prefersReducedMotion() ? total : 0)
    trackWidget("W3", "rivedi", { decisione: dec.id })
  }

  const next = dec.msgs[shown]

  return (
    <div ref={ref} className="pai-panel">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <div className="font-display text-[1.05rem] font-semibold leading-none">Riunione dei manager</div>
          <div className="mt-1.5"><SimBadge /></div>
        </div>
        <span className="font-mono text-[12px] text-muted-foreground">// scegli una decisione: rispondono tutti</span>
      </div>

      <div className="grid lg:grid-cols-[300px_1fr]">
        <div role="radiogroup" aria-label="Decisione da discutere" className="flex flex-col gap-2 border-b border-border p-4 lg:border-b-0 lg:border-r">
          <div className="mb-1 font-mono text-[11px] tracking-[.05em] text-muted-foreground">tu proponi</div>
          {DECISIONI.map((d, i) => {
            const on = i === sel
            return (
              <button
                key={d.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => choose(i)}
                className={`rounded-[12px] border px-4 py-3 text-left text-[15px] font-medium leading-[1.35] transition-colors ${on ? "border-verde bg-verde/10 text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}
              >
                «{d.label}»
              </button>
            )
          })}
          <button
            type="button"
            onClick={replay}
            disabled={!done}
            className="mt-2 self-start font-mono text-[13px] text-verde transition-opacity hover:text-verde-2 disabled:opacity-40"
          >
            ↺ rivedi
          </button>
        </div>

        <div ref={scroller} className="flex h-[min(520px,70vh)] flex-col gap-3.5 overflow-y-auto p-[clamp(14px,2vw,22px)] lg:h-[460px]" aria-live="polite">
          {dec.msgs.slice(0, shown).map((m, i) => <Bubble key={`${dec.id}-${i}`} m={m} />)}
          {!done && typing && next && (
            <div className="flex items-center gap-3 font-mono text-[12px] text-muted-foreground">
              {next.from !== "sintesi" && (
                <span className={`flex size-9 flex-none items-center justify-center rounded-full text-[11px] font-bold opacity-70 ${AVATAR[next.from]}`} aria-hidden>{ROLE_SHORT[next.from]}</span>
              )}
              <span>{next.from === "sintesi" ? "sintesi in preparazione" : `${ROLE_SHORT[next.from]} sta scrivendo`}</span>
              <TypingDots />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
