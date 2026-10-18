/* Schema della candidatura (§4.10), condiviso tra form e API. */

import { FORM_OPTIONS } from "@/lib/content"

export type Lead = {
  nome: string
  email: string
  azienda: string
  ruolo: string
  dipendenti: string
  fatturato: string
  manager: string
  area: string
  decisione: string
  innesco?: string
  processo?: string
  privacy: boolean
  /** Nascosti: da dove arriva la scelta e cosa ha dichiarato in W5. */
  fonti_dichiarate?: string
  origine_manager?: string
  /** Contesto di sessione: fonte, campagna, varianti. */
  contesto?: Record<string, unknown>
}

const PERSONALI = [
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.it", "hotmail.com", "hotmail.it", "outlook.com", "outlook.it",
  "live.com", "live.it", "msn.com", "icloud.com", "me.com", "libero.it", "virgilio.it", "alice.it", "tim.it",
  "tiscali.it", "fastwebnet.it", "email.it", "inwind.it", "aol.com", "proton.me", "protonmail.com", "gmx.com", "gmx.it",
]

export const isPersonalEmail = (email: string) => PERSONALI.includes(email.split("@")[1]?.toLowerCase().trim() ?? "")

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Ritorna gli errori per campo (vuoto = valido). Messaggi: cosa manca e come rimediare. */
export function validateLead(l: Partial<Lead>): Record<string, string> {
  const e: Record<string, string> = {}
  const req = (k: keyof Lead, msg: string) => { if (!String(l[k] ?? "").trim()) e[k] = msg }
  req("nome", "Scrivi nome e cognome.")
  req("azienda", "Scrivi il nome dell'azienda.")
  if (!EMAIL_RE.test(String(l.email ?? "").trim())) e.email = "Controlla l'email: manca qualcosa."
  else if (isPersonalEmail(String(l.email))) e.email = "Usa l'email dell'azienda: selezioniamo dai dati dell'azienda, non della persona."
  const opt = (k: keyof Lead, list: string[], msg: string) => { if (!list.includes(String(l[k] ?? ""))) e[k] = msg }
  opt("ruolo", FORM_OPTIONS.ruolo, "Scegli il tuo ruolo.")
  opt("dipendenti", FORM_OPTIONS.dipendenti, "Scegli la fascia di dipendenti.")
  opt("fatturato", FORM_OPTIONS.fatturato, "Scegli la fascia di fatturato.")
  opt("manager", FORM_OPTIONS.manager, "Scegli da quale manager partiresti, anche «Non so».")
  opt("area", FORM_OPTIONS.area, "Dicci chi segue oggi quell'area.")
  req("decisione", "Scrivi una decisione, anche in una riga.")
  if (l.innesco && !FORM_OPTIONS.innesco.includes(l.innesco)) e.innesco = "Scegli una delle opzioni."
  if (!l.privacy) e.privacy = "Serve il consenso per ricontattarti."
  for (const k of ["nome", "azienda", "decisione", "processo"] as const) {
    if (String(l[k] ?? "").length > 2000) e[k] = "Testo troppo lungo: tienilo sotto i 2.000 caratteri."
  }
  return e
}
