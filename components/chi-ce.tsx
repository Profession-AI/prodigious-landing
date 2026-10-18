import { Section, Kicker, H2, TwoLine } from "@/components/section"
import { Arrow, BTN_OUTLINE_LIGHT } from "@/components/ui/cta"
import { TrackedLink } from "@/components/tracked-link"
import { CHI } from "@/lib/content"

/** Chi c'è dietro: tono chiaro, come "chi siamo" su aipowered.it. */
export function ChiCe() {
  return (
    <Section id="chi" tone="light">
      <Kicker tone="light">// chi c'è dietro</Kicker>
      <h2 className={`${H2} max-w-[24ch]`}><TwoLine lines={CHI.title} tone="light" /></h2>
      <p className="mt-6 max-w-[62ch] text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.6] text-[#3D4A4A]">{CHI.text}</p>

      <div className="mt-[42px] grid gap-4 md:grid-cols-3">
        {CHI.stats.map((s) => (
          <article key={s.value} className="flex flex-col rounded-[16px] border border-[#D5DEDC] bg-white p-[clamp(22px,2.2vw,28px)]">
            <div className="pai-tabular font-display text-[clamp(2.4rem,3.8vw,3.2rem)] font-semibold leading-none text-[var(--verde-deep)]">{s.value}</div>
            <p className="mt-4 text-[1.02rem] leading-[1.55] text-[#3D4A4A]">{s.text}</p>
          </article>
        ))}
      </div>

      <div className="mt-11">
        <TrackedLink href="https://profession.ai" external event="cta_click" props={{ posizione: "chi-ce-dietro" }} className={BTN_OUTLINE_LIGHT}>
          Scopri ProfessionAI <Arrow />
        </TrackedLink>
      </div>
    </Section>
  )
}
