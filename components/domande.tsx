"use client"

import { useState } from "react"
import { Section, Kicker, H2 } from "@/components/section"
import { FAQ } from "@/lib/content"
import { track } from "@/lib/track"

/** Le domande scomode. Risposte fisse, scritte: niente chat, niente generazione. */
export function Domande() {
  const [open, setOpen] = useState<number | null>(null)
  const toggle = (i: number) => {
    const next = open === i ? null : i
    setOpen(next)
    if (next !== null) track("faq_open", { domanda: String(i + 1).padStart(2, "0") })
  }
  return (
    <Section id="domande">
      <Kicker>// le domande scomode</Kicker>
      <h2 className={`${H2} max-w-[22ch]`}>{FAQ.title}</h2>
      <p className="mt-5 max-w-[56ch] text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.55] text-muted-foreground">{FAQ.sub}</p>

      <div className="mt-[42px] flex max-w-[860px] flex-col gap-2">
        {FAQ.items.map((f, i) => {
          const isOpen = open === i
          const n = String(i + 1).padStart(2, "0")
          return (
            <div key={f.q} className={`rounded-[14px] border transition-colors ${isOpen ? "border-verde bg-ink-2" : "border-border hover:border-[rgba(255,255,255,.3)]"}`}>
              <h3>
                <button type="button" onClick={() => toggle(i)} aria-expanded={isOpen} aria-controls={`faq-${i}`} className="flex w-full items-start gap-4 px-5 py-[18px] text-left">
                  <span className={`mt-1 font-mono text-[14px] ${isOpen ? "text-verde" : "text-muted-foreground"}`}>{n}</span>
                  <span className="flex-1 font-sans text-[1.1rem] font-bold leading-[1.35] tracking-normal">{f.q}</span>
                  <span className={`mt-0.5 font-mono text-[18px] leading-none text-muted-foreground transition-transform ${isOpen ? "rotate-45 text-verde" : ""}`} aria-hidden>+</span>
                </button>
              </h3>
              <div id={`faq-${i}`} className="grid transition-[grid-template-rows] duration-300" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                <div className="min-h-0 overflow-hidden">
                  <p className="px-5 pb-5 text-[1.05rem] leading-[1.6] text-muted-foreground sm:pl-[52px]">{f.a}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
