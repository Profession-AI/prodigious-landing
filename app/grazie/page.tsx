import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WRAP } from "@/components/section"
import { BookCall } from "@/components/book-call"

export const metadata: Metadata = { title: "Candidatura ricevuta", robots: { index: false } }

/** Thank-you page (§4.10). Il link al calendario traccia call_booked. */
export default function Grazie() {
  return (
    <>
      <Navbar withCta={false} />
      <main className="relative overflow-clip">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 -z-[1] h-[520px] w-[min(1000px,130vw)] -translate-x-1/2 rounded-full opacity-60 [background:radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--verde)_16%,transparent),transparent_65%)]" />
        <section className={`${WRAP} flex min-h-[70vh] flex-col justify-center py-24`}>
          <div className="pai-label mb-[22px]">// candidatura ricevuta</div>
          <h1 className="max-w-[20ch] font-display text-[clamp(2.2rem,5vw,3.8rem)] font-semibold leading-[1.06]">
            <span className="pai-out">Ricevuta.</span> <span className="text-verde">Ti scriviamo entro due giorni.</span>
          </h1>
          <p className="mt-6 max-w-[52ch] text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.55] text-muted-foreground">Se vuoi saltare la coda, prenota la call ora:</p>
          <BookCall />
        </section>
      </main>
      <Footer />
    </>
  )
}
