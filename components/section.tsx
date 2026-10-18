import { Reveal } from "@/components/anim"
import { cn } from "@/lib/utils"

/* Scheletro di sezione (ricette di aipowered.it, registro marketing). */
export const WRAP = "mx-auto w-full max-w-[1240px] px-[clamp(16px,4vw,52px)]"
export const H2 = "font-display text-[clamp(1.9rem,4vw,3.1rem)] font-semibold leading-[1.08]"
export const LEAD = "text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.55] text-muted-foreground"
export const GREEN = "text-verde [text-shadow:0_0_22px_color-mix(in_srgb,var(--verde-2)_30%,transparent)]"
export const CARD = "rounded-[16px] border border-border bg-ink-2"

type Tone = "dark" | "light"

export function Section({ id, tone = "dark", className, children, ...rest }: { id?: string; tone?: Tone; className?: string; children: React.ReactNode; [k: string]: unknown }) {
  const bg = tone === "light" ? "bg-[#F2F5F4] text-[#0B1414]" : ""
  return (
    <Reveal as="section" id={id} className={cn("py-[clamp(64px,8vw,108px)]", bg, className)} {...rest}>
      <div className={WRAP}>{children}</div>
    </Reveal>
  )
}

/** Etichetta di sezione: minuscolo, con "//". */
export function Kicker({ children, tone = "dark", className }: { children: React.ReactNode; tone?: Tone; className?: string }) {
  return <div className={cn("pai-label mb-[22px]", tone === "light" && "pai-label--light", className)}>{children}</div>
}

/** Titolo in due frasi: la prima constata, la seconda risponde (in verde). */
export function TwoLine({ lines, tone = "dark" }: { lines: string[]; tone?: Tone }) {
  return (
    <>
      <span className={tone === "light" ? "text-[#0B1414]" : "pai-out"}>{lines[0]}</span>{" "}
      <span className={tone === "light" ? "text-[var(--verde-deep)]" : "text-verde"}>{lines[1]}</span>
    </>
  )
}

/** Chiusura di sezione: una frase che spinge. */
export function Closer({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("mt-10 max-w-[56ch] font-display text-[clamp(1.2rem,2vw,1.55rem)] font-medium leading-[1.3] tracking-[-.01em]", className)}>{children}</p>
}

/** Etichetta "online · simulato" dei widget che imitano il prodotto (W1, W2, W3, W7). */
export function SimBadge({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-[6px] whitespace-nowrap font-mono text-[11px] tracking-[.03em] text-verde-2", className)}>
      <span className="size-[6px] rounded-full bg-verde-2 shadow-[0_0_7px_var(--verde-2)]" aria-hidden />
      online · simulato
    </span>
  )
}
