"use client"

import { useState } from "react"
import { Section, Kicker, H2, LEAD, TwoLine, CARD } from "@/components/section"
import { ApplyButton, Micro } from "@/components/ui/cta"
import { W5Leggibile } from "@/components/widgets/w5-leggibile"
import { W6Contesto } from "@/components/widgets/w6-contesto"
import { COME } from "@/lib/content"
import { track } from "@/lib/track"

type Step = (typeof COME.steps)[number]

function StepBlock({ s }: { s: Step }) {
  return (
    <div className="grid gap-4 md:grid-cols-[140px_1fr] md:gap-8">
      <div className="flex items-baseline gap-3 md:flex-col md:gap-1.5">
        <span className="font-display text-[2.6rem] font-semibold leading-none text-verde">{s.n}</span>
        <span className="font-mono text-[12px] tracking-[.04em] text-muted-foreground">{s.meta}</span>
      </div>
      <div>
        <h3 className="font-display text-[clamp(1.4rem,2.2vw,1.75rem)] font-semibold leading-[1.15]">{s.title}</h3>
        <p className="mt-3 max-w-[62ch] text-[1.08rem] leading-[1.6] text-muted-foreground">{s.text}</p>
      </div>
    </div>
  )
}

/** Passo 04: distinto dai primi tre, chiuso di default. Si legge come una porta aperta. */
function Step04() {
  const [open, setOpen] = useState(false)
  const toggle = () => {
    const next = !open
    setOpen(next)
    if (next) track("step04_expand", {})
  }
  const s = COME.step04
  return (
    <div className="rounded-[16px] border border-dashed border-[rgba(255,255,255,.22)] p-[clamp(18px,2.4vw,26px)]">
      <button type="button" onClick={toggle} aria-expanded={open} aria-controls="step04" className="flex w-full items-start gap-4 text-left md:gap-8">
        <span className="flex w-auto flex-none items-baseline gap-3 md:w-[140px] md:flex-col md:gap-1.5">
          <span className="font-display text-[2.6rem] font-semibold leading-none text-muted-foreground">{s.n}</span>
          <span className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground">opzionale</span>
        </span>
        <span className="flex-1">
          <span className="block font-display text-[clamp(1.3rem,2vw,1.6rem)] font-semibold leading-[1.15]">{s.title}</span>
          <span className="mt-2 block font-mono text-[12px] text-muted-foreground">il prodotto che compri oggi finisce al passo 03 · {open ? "chiudi" : "leggi cosa c'è dopo"}</span>
        </span>
        <span className={`mt-1 font-mono text-[20px] leading-none text-muted-foreground transition-transform ${open ? "rotate-45 text-verde" : ""}`} aria-hidden>+</span>
      </button>
      <div id="step04" className="grid transition-[grid-template-rows] duration-300" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
        <div className="min-h-0 overflow-hidden">
          <p className="mt-4 max-w-[64ch] text-[1.05rem] leading-[1.6] text-muted-foreground md:ml-[172px]">{s.text}</p>
        </div>
      </div>
    </div>
  )
}

export function ComeFunziona() {
  const [s1, s2, s3] = COME.steps
  return (
    <Section id="come-funziona">
      <Kicker>// come funziona</Kicker>
      <h2 className={`${H2} max-w-[26ch]`}><TwoLine lines={COME.title} /></h2>
      <p className={`${LEAD} mt-5 max-w-[62ch]`}>{COME.body}</p>

      <div className="mt-14 flex flex-col gap-12">
        <StepBlock s={s1} />
        <div className="md:ml-[172px]">
          <W5Leggibile />
        </div>
        <StepBlock s={s2} />

        <div className={`${CARD} grid gap-8 p-[clamp(20px,3vw,32px)] md:ml-[172px] lg:grid-cols-[1fr_1.25fr]`}>
          <div>
            <div className="font-mono text-[13px] tracking-[.04em] text-verde">{COME.box.kicker}</div>
            <p className="mt-4 text-[1.08rem] leading-[1.6]">{COME.box.text}</p>
          </div>
          <W6Contesto />
        </div>

        <StepBlock s={s3} />
        <div className="h-px bg-border" aria-hidden />
        <Step04 />
      </div>

      <div className="mt-12 flex flex-col items-start gap-3.5">
        <ApplyButton position="come-funziona" />
        <Micro items={COME.micro} />
      </div>
    </Section>
  )
}
