"use client"

import { useEffect, useState } from "react"
import { TypingDots, prefersReducedMotion } from "@/components/anim"
import { SimBadge } from "@/components/section"
import { DOMANDE, ROLE_SHORT, type RoleId } from "@/lib/meridiane"
import { trackWidget } from "@/lib/track"

/* W2 · Chiedi al manager. Tre domande fisse per ruolo, una risposta aperta alla volta,
   con i numeri di Officine Meridiane. Niente testo libero. */

function Answer({ text }: { text: string }) {
  const [thinking, setThinking] = useState(true)
  useEffect(() => {
    if (prefersReducedMotion()) { setThinking(false); return }
    const t = setTimeout(() => setThinking(false), 650)
    return () => clearTimeout(t)
  }, [])
  return thinking ? <TypingDots /> : <p className="text-[14.5px] leading-[1.55] text-foreground [animation:pai-tick_.3s_ease_both]">{text}</p>
}

export function W2Chiedi({ role }: { role: RoleId }) {
  const [open, setOpen] = useState<number | null>(null)
  const items = DOMANDE[role]

  const toggle = (i: number) => {
    const next = open === i ? null : i
    setOpen(next)
    if (next !== null) trackWidget("W2", "domanda", { ruolo: role, domanda: items[i].q })
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[11px] tracking-[.05em] text-muted-foreground">gli chiedi quando vuoi</span>
        <SimBadge className="text-[10px]" />
      </div>
      <div className="mt-2.5 flex flex-col gap-1.5">
        {items.map((d, i) => {
          const isOpen = open === i
          return (
            <div key={d.q} className={`rounded-[10px] border transition-colors ${isOpen ? "border-verde/60 bg-ink" : "border-border hover:border-[rgba(255,255,255,.3)]"}`}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => toggle(i)}
                className="flex w-full items-start gap-2 px-3 py-2.5 text-left text-[14px] leading-[1.35]"
              >
                <span className="font-mono text-verde" aria-hidden>›</span>
                <span className="flex-1">{d.q}</span>
              </button>
              {isOpen && (
                <div className="px-3 pb-3">
                  <div className="mb-1.5 font-mono text-[10px] tracking-[.06em] text-verde-2">// {ROLE_SHORT[role].toLowerCase()}</div>
                  <Answer text={d.a} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
