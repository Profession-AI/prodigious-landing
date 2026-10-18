import { WRAP, LEAD } from "@/components/section"
import { ApplyButton, Micro } from "@/components/ui/cta"
import { W1Briefing } from "@/components/widgets/w1-briefing"
import { HERO } from "@/lib/content"

/** Hero: due frasi corte con il punto in mezzo. Variante B solo su traffico titolari (§7). */
export function Hero({ variant }: { variant: "a" | "b" }) {
  const [l1, l2] = variant === "b" ? HERO.b : HERO.a
  return (
    <section className="relative overflow-clip pb-[clamp(48px,7vh,80px)] pt-[clamp(40px,7vh,88px)]">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[-10%] -z-[1] h-[620px] w-[min(900px,120vw)] rounded-full opacity-60 [background:radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--verde)_16%,transparent),transparent_65%)]"
      />
      <div className={`${WRAP} grid items-center gap-[clamp(36px,5vw,64px)] lg:grid-cols-[1.02fr_1fr]`}>
        <div>
          <div className="pai-fade pai-label mb-0! text-[12px]! sm:text-[13px]! [animation-delay:.05s]">{HERO.eyebrow}</div>
          <h1 className="mt-7 font-display text-[clamp(2.1rem,4.6vw,3.7rem)] font-semibold leading-[1.06]">
            <span className="block overflow-hidden pb-[.16em] -mb-[.1em]">
              <span className="pai-rise pai-out" style={{ animationDelay: ".15s" }}>{l1}</span>
            </span>
            <span className="block overflow-hidden pb-[.16em] -mb-[.1em]">
              <span className="pai-rise text-verde" style={{ animationDelay: ".27s" }}>{l2}</span>
            </span>
          </h1>
          <p className={`pai-fade ${LEAD} mt-6 max-w-[58ch] [animation-delay:.4s]`}>{HERO.sub}</p>
          <div className="pai-fade mt-8 flex flex-col items-start gap-3.5 [animation-delay:.55s]">
            <ApplyButton position="hero" className="px-8 py-[15px] text-[1.05rem]" />
            <Micro items={HERO.micro} />
          </div>
        </div>
        <div className="pai-fade [animation-delay:.35s]">
          <W1Briefing />
        </div>
      </div>
    </section>
  )
}
