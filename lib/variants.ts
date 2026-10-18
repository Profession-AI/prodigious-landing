/* Varianti del §7, una sola alla volta. Si scelgono via query string e restano
   per la sessione, così anche il form e la thank-you page sanno da dove vieni:
   ?hero=b · ?prezzo=richiesta · ?confronto=off · ?cta=b */

export type Variants = {
  hero: "a" | "b"
  prezzo: "visibile" | "richiesta"
  confronto: "on" | "off"
  cta: "a" | "b"
}

export const DEFAULT_VARIANTS: Variants = { hero: "a", prezzo: "visibile", confronto: "on", cta: "a" }

type SP = Record<string, string | string[] | undefined>
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)

export function variantsFromParams(sp: SP): Variants {
  return {
    hero: one(sp.hero) === "b" ? "b" : "a",
    prezzo: one(sp.prezzo) === "richiesta" ? "richiesta" : "visibile",
    confronto: one(sp.confronto) === "off" ? "off" : "on",
    cta: one(sp.cta) === "b" ? "b" : "a",
  }
}

export const CTA_LABEL: Record<Variants["cta"], string> = {
  a: "Candida la tua azienda",
  b: "Richiedi l'analisi gratuita",
}
