"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Reveal } from "@/components/anim"
import { WRAP, H2, LEAD, TwoLine } from "@/components/section"
import { Arrow, BTN_PRIMARY, Micro } from "@/components/ui/cta"
import { useVariants } from "@/components/session"
import { CANDIDATURA, FORM_OPTIONS, PILOTA, PRIVACY_URL } from "@/lib/content"
import { CTA_LABEL } from "@/lib/variants"
import { validateLead, type Lead } from "@/lib/lead"
import { onPrefill } from "@/lib/prefill"
import { getContext, track } from "@/lib/track"
import { cn } from "@/lib/utils"

const FIELD =
  "w-full rounded-[10px] border border-border bg-[var(--field-bg)] px-4 py-3 text-[1.02rem] text-foreground placeholder:text-[rgba(242,245,244,.42)] transition-colors focus:border-verde focus:outline-none"
const LABEL = "text-[15px] font-bold"
const OPT = "font-normal text-muted-foreground"

/** W8 · Contatore posti pilota. Nessuna interazione: aggiornato a mano (PILOTA in lib/content.ts). */
function W8Posti() {
  const { disponibili, totali } = PILOTA
  return (
    <div className="rounded-[16px] border border-border bg-ink-2 p-5">
      <div className="font-mono text-[12px] tracking-[.04em] text-muted-foreground">// posti del pilota</div>
      {disponibili > 0 ? (
        <>
          <div className="mt-3 flex items-baseline gap-2 font-display font-semibold">
            <span className="pai-tabular text-[3.2rem] leading-none text-verde">{disponibili}</span>
            <span className="text-[1.2rem] text-muted-foreground">su {totali}</span>
          </div>
          <div className="mt-1 text-[15px]">ancora disponibili</div>
          <div className="mt-4 flex gap-1" aria-hidden>
            {Array.from({ length: totali }, (_, i) => (
              <span key={i} className={`h-2 flex-1 rounded-full ${i < totali - disponibili ? "bg-[rgba(255,255,255,.18)]" : "bg-verde"}`} />
            ))}
          </div>
          <p className="mt-4 font-mono text-[11px] leading-[1.6] text-muted-foreground">aggiornato a mano, solo con candidature accettate</p>
        </>
      ) : (
        <p className="mt-3 text-[1.05rem] leading-[1.5]">I dieci posti sono finiti. Apriamo una lista d'attesa: ti scriviamo quando parte il secondo gruppo.</p>
      )}
    </div>
  )
}

function Field({ label, optional, error, children, hint }: { label: string; optional?: boolean; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className={LABEL}>{label} {optional && <span className={OPT}>(opzionale)</span>}</span>
      {children}
      {error ? <span className="text-[14px] text-danger">{error}</span> : hint ? <span className="text-[14px] text-muted-foreground">{hint}</span> : null}
    </label>
  )
}

function Select({ name, options, value, onChange, invalid }: { name: string; options: string[]; value: string; onChange: (v: string) => void; invalid?: boolean }) {
  return (
    <select name={name} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={invalid || undefined} className={cn(FIELD, "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22><path d=%22M1 1l5 5 5-5%22 stroke=%22%2384FFBE%22 stroke-width=%221.6%22 fill=%22none%22/></svg>')] bg-[length:12px_8px] bg-[position:right_16px_center] bg-no-repeat pr-10", invalid && "border-danger", !value && "text-[rgba(242,245,244,.5)]")}>
      <option value="" disabled>Scegli</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

type State = Omit<Lead, "privacy" | "contesto"> & { privacy: boolean }

const EMPTY: State = {
  nome: "", email: "", azienda: "", ruolo: "", dipendenti: "", fatturato: "", manager: "", area: "",
  decisione: "", innesco: "", processo: "", privacy: false, fonti_dichiarate: "", origine_manager: "",
}

export function Candidatura() {
  const v = useVariants()
  const router = useRouter()
  const [s, setS] = useState<State>(EMPTY)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)
  const [sysError, setSysError] = useState<string | null>(null)
  const [prefilled, setPrefilled] = useState<string | null>(null)
  const started = useRef(false)
  const waitlist = PILOTA.disponibili <= 0

  useEffect(() => onPrefill((p) => {
    setS((cur) => ({
      ...cur,
      manager: p.manager ?? cur.manager,
      fonti_dichiarate: p.fonti ? p.fonti.join(", ") : cur.fonti_dichiarate,
      origine_manager: p.origine ?? cur.origine_manager,
    }))
    if (p.manager) setPrefilled(p.manager)
  }), [])

  const set = <K extends keyof State>(k: K, val: State[K]) => {
    setS((cur) => ({ ...cur, [k]: val }))
    if (errors[k as string]) setErrors((cur) => { const next = { ...cur }; delete next[k as string]; return next })
  }

  const onFocus = () => {
    if (started.current) return
    started.current = true
    track("form_start", {})
  }

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSysError(null)
    const errs = validateLead(s)
    setErrors(errs)
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0]
      ;(e.currentTarget.querySelector(`[name="${first}"]`) as HTMLElement | null)?.focus()
      track("form_error", { campi: Object.keys(errs).join(",") })
      return
    }
    setBusy(true)
    const ctx = getContext()
    try {
      const r = await fetch("/api/candidatura", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...s, contesto: ctx ?? {} }),
      })
      if (!r.ok) throw new Error(String(r.status))
      track("form_submit", {
        ruolo_manager: s.manager,
        chi_segue_area: s.area,
        ruolo_compilatore: s.ruolo,
        dipendenti: s.dipendenti,
        fatturato: s.fatturato,
        innesco: s.innesco || "",
        origine_manager: s.origine_manager || "",
        fonti_dichiarate: s.fonti_dichiarate || "",
        processo_agente: Boolean(s.processo?.trim()),
      })
      router.push("/grazie")
    } catch {
      setBusy(false)
      setSysError("Invio non riuscito: la candidatura non è arrivata. Riprova tra un momento, oppure scrivici a humans@profession.ai.")
    }
  }

  const label = waitlist ? "Entra in lista d'attesa" : CTA_LABEL[v.cta]

  return (
    <Reveal as="section" id="candidatura" className="relative overflow-clip border-t border-border py-[clamp(72px,10vw,120px)]">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 -z-[1] h-[520px] w-[min(1000px,130vw)] -translate-x-1/2 rounded-full opacity-60 [background:radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--verde)_16%,transparent),transparent_65%)]" />
      <div className={`${WRAP} grid gap-10 lg:grid-cols-[.85fr_1.15fr]`}>
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="pai-label mb-[22px]">// candidatura</div>
          <h2 className={`${H2} max-w-[18ch]`}><TwoLine lines={CANDIDATURA.title} /></h2>
          <p className={`${LEAD} mt-6 max-w-[48ch]`}>{CANDIDATURA.sub}</p>
          <div className="mt-8 max-w-[360px]"><W8Posti /></div>
        </div>

        <form onSubmit={submit} onFocus={onFocus} noValidate className="flex flex-col gap-5 rounded-[18px] border border-border bg-ink-2 p-[clamp(18px,3vw,32px)]">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Nome e cognome" error={errors.nome}>
              <input name="nome" value={s.nome} onChange={(e) => set("nome", e.target.value)} autoComplete="name" aria-invalid={!!errors.nome || undefined} className={cn(FIELD, errors.nome && "border-danger")} />
            </Field>
            <Field label="Email aziendale" error={errors.email} hint="Quella dell'azienda, non quella personale.">
              <input name="email" type="email" value={s.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" placeholder="es. nome@azienda.it" aria-invalid={!!errors.email || undefined} className={cn(FIELD, errors.email && "border-danger")} />
            </Field>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Azienda" error={errors.azienda}>
              <input name="azienda" value={s.azienda} onChange={(e) => set("azienda", e.target.value)} autoComplete="organization" aria-invalid={!!errors.azienda || undefined} className={cn(FIELD, errors.azienda && "border-danger")} />
            </Field>
            <Field label="Il tuo ruolo" error={errors.ruolo}>
              <Select name="ruolo" options={FORM_OPTIONS.ruolo} value={s.ruolo} onChange={(x) => set("ruolo", x)} invalid={!!errors.ruolo} />
            </Field>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Dipendenti" error={errors.dipendenti}>
              <Select name="dipendenti" options={FORM_OPTIONS.dipendenti} value={s.dipendenti} onChange={(x) => set("dipendenti", x)} invalid={!!errors.dipendenti} />
            </Field>
            <Field label="Fatturato annuo" error={errors.fatturato}>
              <Select name="fatturato" options={FORM_OPTIONS.fatturato} value={s.fatturato} onChange={(x) => set("fatturato", x)} invalid={!!errors.fatturato} />
            </Field>
          </div>

          <div className="h-px bg-border" aria-hidden />

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Da quale manager partiresti" error={errors.manager} hint={prefilled && s.manager === prefilled ? `Precompilato dalla tua scelta: ${prefilled}. Puoi cambiarlo.` : undefined}>
              <Select name="manager" options={FORM_OPTIONS.manager} value={s.manager} onChange={(x) => set("manager", x)} invalid={!!errors.manager} />
            </Field>
            <Field label="Oggi quell'area chi la segue?" error={errors.area}>
              <Select name="area" options={FORM_OPTIONS.area} value={s.area} onChange={(x) => set("area", x)} invalid={!!errors.area} />
            </Field>
          </div>
          {s.fonti_dichiarate && (
            <p className="-mt-1 font-mono text-[12px] leading-[1.6] text-muted-foreground">dati che hai dichiarato: {s.fonti_dichiarate}</p>
          )}
          <Field label="Una decisione che oggi si prende a occhio" error={errors.decisione}>
            <textarea name="decisione" rows={3} value={s.decisione} onChange={(e) => set("decisione", e.target.value)} placeholder="es. quanto magazzino tenere a dicembre" aria-invalid={!!errors.decisione || undefined} className={cn(FIELD, "resize-y", errors.decisione && "border-danger")} />
          </Field>
          <Field label="Hai qualcosa in arrivo?" optional error={errors.innesco}>
            <Select name="innesco" options={FORM_OPTIONS.innesco} value={s.innesco ?? ""} onChange={(x) => set("innesco", x)} />
          </Field>
          <Field label="C'è un processo che vorresti delegare a un agente?" optional>
            <textarea name="processo" rows={2} value={s.processo} onChange={(e) => set("processo", e.target.value)} placeholder="es. i solleciti di pagamento" className={cn(FIELD, "resize-y")} />
          </Field>

          <input type="hidden" name="fonti_dichiarate" value={s.fonti_dichiarate} />
          <input type="hidden" name="origine_manager" value={s.origine_manager} />

          <label className="flex items-start gap-3 text-[15px] leading-[1.5] text-muted-foreground">
            <input type="checkbox" name="privacy" checked={s.privacy} onChange={(e) => set("privacy", e.target.checked)} className="mt-1 size-4 shrink-0 accent-[var(--verde)]" />
            <span>
              Ho letto la <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer" className="text-verde underline underline-offset-2">privacy policy</a> e acconsento a essere ricontattato per il programma pilota.
              {errors.privacy && <span className="mt-1 block text-[14px] text-danger">{errors.privacy}</span>}
            </span>
          </label>

          {sysError && (
            <div role="alert" className="rounded-[10px] border border-danger/70 px-4 py-3 text-[15px] leading-[1.5]">
              <span className="font-bold text-danger">Invio non riuscito. </span>
              {sysError.replace("Invio non riuscito: ", "")}
            </div>
          )}

          <div className="flex flex-col items-start gap-3 pt-1">
            <button type="submit" disabled={busy} className={`${BTN_PRIMARY} px-8 py-[15px] text-[1.05rem]`}>
              {busy ? "Invio in corso" : label} <Arrow />
            </button>
            <Micro items={CANDIDATURA.micro} />
          </div>
        </form>
      </div>
    </Reveal>
  )
}
