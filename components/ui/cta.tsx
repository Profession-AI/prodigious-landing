"use client"

import { cn } from "@/lib/utils"
import { track } from "@/lib/track"
import { CTA_LABEL } from "@/lib/variants"
import { useVariants } from "@/components/session"

/* Ricette bottoni (aipowered.it): pill, freccia in mono, nessuno scale. */
export const BTN_PRIMARY =
  "inline-flex items-center justify-center gap-2.5 rounded-full bg-verde px-[26px] py-3.5 font-semibold text-[#06150E] transition-colors duration-200 hover:bg-verde-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-60"
export const BTN_OUTLINE =
  "inline-flex items-center justify-center gap-2.5 rounded-full border-[1.5px] border-[rgba(255,255,255,.34)] px-[22px] py-3 font-semibold text-foreground transition-colors duration-200 hover:bg-paper hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
export const BTN_OUTLINE_LIGHT =
  "inline-flex items-center justify-center gap-2.5 rounded-full border-[1.5px] border-[#0B1414] px-[26px] py-3.5 font-semibold text-[#0B1414] transition-colors duration-200 hover:bg-[#0B1414] hover:text-verde"

export function Arrow({ down = false }: { down?: boolean }) {
  return <span className="font-mono" aria-hidden>{down ? "↓" : "→"}</span>
}

/** Microcopy sotto i CTA: frammenti separati da "·", minuscolo. */
export function Micro({ items, className }: { items: string[]; className?: string }) {
  return (
    <p className={cn("font-mono text-[13px] leading-[1.6] tracking-[.02em] text-muted-foreground", className)}>
      {items.map((t, i) => (
        <span key={t}>
          {i > 0 && <span className="px-2 opacity-60">·</span>}
          {t}
        </span>
      ))}
    </p>
  )
}

/** CTA primario: porta al form. Etichetta secondo la variante CTA (§7). */
export function ApplyButton({ position, className, label }: { position: string; className?: string; label?: string }) {
  const v = useVariants()
  return (
    <a
      href="#candidatura"
      onClick={() => track("cta_click", { posizione: position })}
      className={cn(BTN_PRIMARY, className)}
    >
      {label ?? CTA_LABEL[v.cta]}
      <Arrow />
    </a>
  )
}
