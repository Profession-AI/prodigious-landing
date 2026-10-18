/* Un CTA o un widget può precompilare il form di candidatura (es. "Parto dal CFO",
   o la configurazione di W5) e portarci il visitatore. Bus minimo via CustomEvent. */

export type Prefill = { manager?: string; fonti?: string[]; origine?: string }

const EVT = "prodigious:prefill"
let last: Prefill | null = null

export function prefillForm(p: Prefill, scroll = true) {
  last = { ...last, ...p }
  window.dispatchEvent(new CustomEvent<Prefill>(EVT, { detail: last }))
  if (scroll) document.getElementById("candidatura")?.scrollIntoView({ behavior: "smooth", block: "start" })
}

export function onPrefill(cb: (p: Prefill) => void) {
  if (last) cb(last)
  const h = (e: Event) => cb((e as CustomEvent<Prefill>).detail)
  window.addEventListener(EVT, h)
  return () => window.removeEventListener(EVT, h)
}
