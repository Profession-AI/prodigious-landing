import { Session } from "@/components/session"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { TrustBar } from "@/components/trust-bar"
import { Problema } from "@/components/problema"
import { ConChi } from "@/components/con-chi"
import { Manager } from "@/components/manager"
import { ComeFunziona } from "@/components/come-funziona"
import { Prezzo } from "@/components/prezzo"
import { NonFacciamo } from "@/components/non-facciamo"
import { ChiCe } from "@/components/chi-ce"
import { Domande } from "@/components/domande"
import { Candidatura } from "@/components/candidatura"
import { variantsFromParams } from "@/lib/variants"

/* Landing per smoke test. Ordine delle sezioni dal §3 del documento.
   Varianti (§7) via query string: ?hero=b · ?prezzo=richiesta · ?confronto=off · ?cta=b */
export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const variants = variantsFromParams(await searchParams)

  return (
    <Session variants={variants}>
      <Navbar />
      <main className="relative overflow-clip">
        <Hero variant={variants.hero} />
        <TrustBar />
        <Problema />
        <ConChi />
        <Manager />
        <ComeFunziona />
        <Prezzo />
        <NonFacciamo />
        <ChiCe />
        <Domande />
        <Candidatura />
      </main>
      <Footer />
    </Session>
  )
}
