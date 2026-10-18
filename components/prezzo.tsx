"use client"

import { useEffect, useRef } from "react"
import { Section, Kicker, H2, TwoLine, CARD } from "@/components/section"
import { ApplyButton } from "@/components/ui/cta"
import { W4Cursore } from "@/components/widgets/w4-cursore"
import { useVariants } from "@/components/session"
import { PREZZI } from "@/lib/content"
import { track } from "@/lib/track"

/** pricing_view: tempo effettivo con la sezione a schermo, inviato quando esce o la pagina si chiude. */
function usePricingView() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === "undefined") return
    let since = 0
    let total = 0
    let sentFirst = false
    const flush = () => {
      if (since) { total += Date.now() - since; since = 0 }
      if (total > 500) track("pricing_view", { secondi: Math.round(total / 1000) })
      total = 0
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        since = Date.now()
        if (!sentFirst) { sentFirst = true; track("pricing_view", { secondi: 0, ingresso: true }) }
      } else flush()
    }, { threshold: 0.3 })
    io.observe(el)
    const onHide = () => { if (document.visibilityState === "hidden") flush() }
    document.addEventListener("visibilitychange", onHide)
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", onHide) }
  }, [])
  return ref
}

function PriceCard({ label, value, unit, text, muted = false }: { label: string; value: string; unit: string; text: string; muted?: boolean }) {
  return (
    <article className={`${CARD} flex flex-col p-[clamp(22px,2.6vw,30px)] ${muted ? "border-dashed bg-transparent" : ""}`}>
      <div className="font-mono text-[12px] tracking-[.04em] text-verde">{label.toLowerCase()}</div>
      <div className={`pai-tabular mt-4 font-display font-semibold leading-none ${muted ? "text-[1.7rem] text-muted-foreground" : "text-[clamp(2.4rem,4vw,3.2rem)]"}`}>{value}</div>
      <div className="mt-2 font-mono text-[13px] text-muted-foreground">{unit}</div>
      <p className="mt-5 text-[1.02rem] leading-[1.6] text-muted-foreground">{text}</p>
    </article>
  )
}

export function Prezzo() {
  const v = useVariants()
  const ref = usePricingView()
  const richiesta = v.prezzo === "richiesta"

  return (
    <Section id="prezzo">
      <div ref={ref}>
        <Kicker>// quanto costa</Kicker>
        <h2 className={`${H2} max-w-[24ch]`}><TwoLine lines={richiesta ? PREZZI.titleRichiesta : PREZZI.title} /></h2>

        <div className="mt-[42px] grid gap-4 md:grid-cols-2">
          <PriceCard label={PREZZI.setup.label} value={richiesta ? "Su richiesta" : PREZZI.setup.value} unit={PREZZI.setup.unit} text={PREZZI.setup.text} />
          <PriceCard label={PREZZI.canone.label} value={richiesta ? "Su richiesta" : PREZZI.canone.value} unit={PREZZI.canone.unit} text={PREZZI.canone.text} />
        </div>
        <div className="mt-4">
          <PriceCard label={PREZZI.agenti.label} value={PREZZI.agenti.value} unit={PREZZI.agenti.unit} text={PREZZI.agenti.text} muted />
        </div>

        {!richiesta && (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div>
              {v.confronto === "on" && (
                <p className="max-w-[48ch] text-[1.1rem] leading-[1.6] text-muted-foreground">
                  {PREZZI.confronto.split(": non si compra.")[0]}: <span className="font-semibold text-foreground">non si compra.</span>
                </p>
              )}
              <div className="mt-8 border-l-2 border-verde pl-5">
                <div className="font-mono text-[12px] tracking-[.05em] text-verde">// programma pilota</div>
                <p className="mt-2 max-w-[46ch] text-[1.08rem] leading-[1.55]">{PREZZI.pilota}</p>
              </div>
              <ApplyButton position="prezzo" className="mt-8" />
            </div>
            <W4Cursore />
          </div>
        )}

        {richiesta && (
          <div className="mt-10">
            <div className="border-l-2 border-verde pl-5">
              <div className="font-mono text-[12px] tracking-[.05em] text-verde">// programma pilota</div>
              <p className="mt-2 max-w-[46ch] text-[1.08rem] leading-[1.55]">{PREZZI.pilota}</p>
            </div>
            <ApplyButton position="prezzo" className="mt-8" />
          </div>
        )}
      </div>
    </Section>
  )
}
