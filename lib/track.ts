/* Piano di tracciamento (§5). Ogni evento va in window.dataLayer (GTM lo raccoglie)
   con il contesto della sessione: fonte, campagna, varianti attive. */

import type { Variants } from "@/lib/variants"

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export type Attribution = {
  fonte: string
  medium: string
  campagna: string
  content: string
  referrer: string
  landing: string
}

type Ctx = Attribution & { variants?: Variants }

const KEY = "prodigious:ctx"
let ctx: Ctx | null = null

/** Fonte del traffico (§5.2): utm_source/medium/campaign, altrimenti referrer, altrimenti "diretto". */
function readAttribution(): Attribution {
  const sp = new URLSearchParams(window.location.search)
  const ref = document.referrer && !document.referrer.includes(window.location.host) ? document.referrer : ""
  let fonte = sp.get("utm_source") || ""
  if (!fonte && ref) {
    try { fonte = new URL(ref).hostname.replace(/^www\./, "") } catch { fonte = "referral" }
  }
  return {
    fonte: fonte || "diretto",
    medium: sp.get("utm_medium") || "",
    campagna: sp.get("utm_campaign") || "",
    content: sp.get("utm_content") || "",
    referrer: ref,
    landing: window.location.pathname + window.location.search,
  }
}

/** Chiamata una volta all'ingresso: fissa l'attribuzione per tutta la sessione. */
export function initContext(variants?: Variants): Ctx {
  if (typeof window === "undefined") return { fonte: "", medium: "", campagna: "", content: "", referrer: "", landing: "" }
  let stored: Ctx | null = null
  try { stored = JSON.parse(sessionStorage.getItem(KEY) || "null") } catch { stored = null }
  const fresh = readAttribution()
  // Una nuova campagna in query sostituisce l'attribuzione precedente.
  const base: Ctx = stored && !new URLSearchParams(window.location.search).get("utm_source") ? stored : fresh
  ctx = { ...base, variants: variants ?? base.variants }
  try { sessionStorage.setItem(KEY, JSON.stringify(ctx)) } catch { /* privato o bloccato */ }
  return ctx
}

export function getContext(): Ctx | null {
  if (ctx) return ctx
  if (typeof window === "undefined") return null
  try { ctx = JSON.parse(sessionStorage.getItem(KEY) || "null") } catch { ctx = null }
  return ctx
}

export function track(event: string, props: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return
  const c = getContext()
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event,
    fonte: c?.fonte,
    campagna: c?.campagna,
    variante_hero: c?.variants?.hero,
    variante_prezzo: c?.variants?.prezzo,
    variante_confronto: c?.variants?.confronto,
    variante_cta: c?.variants?.cta,
    ...props,
  })
  if (process.env.NODE_ENV !== "production") console.debug("[track]", event, props)
}

/** Scorciatoia per W1–W8. */
export const trackWidget = (id: string, azione: string, props: Record<string, unknown> = {}) =>
  track("widget_interact", { widget: id, azione, ...props })
