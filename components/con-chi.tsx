import { Section, Kicker, H2, CARD, Closer } from "@/components/section"
import { CON_CHI } from "@/lib/content"

/** Le due situazioni, a pari peso. Il briefing va prima a chi ricopre il ruolo. */
export function ConChi() {
  return (
    <Section id="con-chi">
      <Kicker>// con chi lavora</Kicker>
      <h2 className={`${H2} max-w-[22ch]`}>
        <span className="pai-out">Due situazioni.</span> <span className="text-verde">Stesso manager.</span>
      </h2>

      <div className="mt-[42px] grid gap-4 md:grid-cols-2">
        {CON_CHI.cols.map((c) => (
          <article key={c.title} className={`${CARD} flex flex-col p-[clamp(24px,3vw,36px)]`}>
            <div className="font-mono text-[13px] tracking-[.04em] text-verde">// {c.tag}</div>
            <h3 className="mt-4 font-display text-[clamp(1.5rem,2.4vw,1.9rem)] font-semibold leading-[1.1]">{c.title}</h3>
            <p className="mt-4 text-[1.08rem] leading-[1.6] text-muted-foreground">{c.text}</p>
            {/* chi riceve cosa, in ordine */}
            <div className="mt-auto pt-7">
              <div className="font-mono text-[11px] tracking-[.05em] text-muted-foreground">il briefing arriva a</div>
              <div className="mt-2.5 flex flex-wrap items-center gap-2 font-mono text-[13px]">
                {c.flow.map((f, i) => (
                  <span key={f} className="flex items-center gap-2">
                    {i > 0 && <span className="text-muted-foreground" aria-hidden>→</span>}
                    <span className={`rounded-full border px-3 py-1.5 ${i === 0 ? "border-verde/60 text-verde-2" : "border-border text-foreground"}`}>{f}</span>
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <Closer>
        <span className="text-foreground">{CON_CHI.close.split(":")[0]}:</span>
        <span className="text-verde">{CON_CHI.close.split(":")[1]}</span>
      </Closer>
    </Section>
  )
}
