import { Section, Kicker, H2, CARD, Closer } from "@/components/section"
import { Arrow } from "@/components/ui/cta"
import { PROBLEMA } from "@/lib/content"
import { TrackedLink } from "@/components/tracked-link"

export function Problema() {
  return (
    <Section id="problema">
      <Kicker>// il problema</Kicker>
      <h2 className={`${H2} max-w-[24ch]`}>{PROBLEMA.title}</h2>

      <div className="mt-[42px] grid gap-4 md:grid-cols-3">
        {PROBLEMA.stats.map((s, i) => (
          <article key={s.value} className={`${CARD} flex flex-col p-[clamp(24px,2.4vw,32px)] transition-colors hover:border-verde`}>
            <div className={`font-display text-[clamp(2.8rem,5vw,4.2rem)] font-semibold leading-none ${i === 0 ? "text-verde" : "text-foreground"}`}>{s.value}</div>
            <p className="mt-4 text-[1.05rem] leading-[1.5] text-muted-foreground">{s.text}</p>
            <p className="mt-3 text-[1.08rem] font-semibold leading-[1.4]">{s.punch}</p>
            <div className="mt-auto pt-5 font-mono text-[13px] tracking-[.04em] text-muted-foreground">({s.source})</div>
          </article>
        ))}
      </div>

      <Closer>
        <span className="text-muted-foreground">{PROBLEMA.close[0]}</span> <span className="text-verde">{PROBLEMA.close[1]}</span>
      </Closer>
      <TrackedLink href="#manager" event="cta_click" props={{ posizione: "problema" }} className="mt-7 inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-[rgba(255,255,255,.34)] px-[22px] py-3 font-semibold transition-colors hover:bg-paper hover:text-ink">
        Vedi i manager <Arrow down />
      </TrackedLink>
    </Section>
  )
}
