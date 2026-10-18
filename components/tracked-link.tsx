"use client"

import { track } from "@/lib/track"

/** <a> che traccia il click. Funziona anche senza JS (è un normale link). */
export function TrackedLink({ href, event, props, className, children, external }: { href: string; event: string; props?: Record<string, unknown>; className?: string; children: React.ReactNode; external?: boolean }) {
  return (
    <a href={href} onClick={() => track(event, props)} className={className} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  )
}
