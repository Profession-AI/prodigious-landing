import { Section, Kicker, H2, CARD, Closer } from "@/components/section"
import { W7Registro } from "@/components/widgets/w7-registro"
import { NON_FACCIAMO } from "@/lib/content"

export function NonFacciamo() {
  const { lead, items } = NON_FACCIAMO
  return (
    <Section id="non-facciamo">
      <Kicker>// cosa non facciamo</Kicker>
      <h2 className={`${H2} max-w-[22ch]`}>{NON_FACCIAMO.title}</h2>

      <div className="mt-[42px] grid gap-8 lg:grid-cols-[.8fr_1.4fr] lg:items-start">
        <div>
          <h3 className="font-display text-[clamp(1.5rem,2.4vw,1.9rem)] font-semibold leading-[1.15] text-verde">{lead.title}</h3>
          <p className="mt-4 text-[1.08rem] leading-[1.6] text-muted-foreground">{lead.text}</p>
          <p className="mt-6 font-mono text-[13px] leading-[1.6] text-foreground">Dopo tre mesi questa tabella è la tua. È il modo in cui sai se ti serve ancora.</p>
        </div>
        <W7Registro />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map((it) => (
          <article key={it.title} className={`${CARD} p-[clamp(20px,2.4vw,28px)]`}>
            <h3 className="font-display text-[1.25rem] font-semibold leading-[1.2]">{it.title}</h3>
            <p className="mt-2.5 text-[1.02rem] leading-[1.6] text-muted-foreground">{it.text}</p>
          </article>
        ))}
      </div>

      <Closer><span className="text-muted-foreground">Il resto lo scopri in tre settimane.</span> <span className="text-verde">È il tempo che chiediamo.</span></Closer>
    </Section>
  )
}
