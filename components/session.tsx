"use client"

import { createContext, useContext, useEffect } from "react"
import { DEFAULT_VARIANTS, type Variants } from "@/lib/variants"
import { initContext, track } from "@/lib/track"

const VariantsContext = createContext<Variants>(DEFAULT_VARIANTS)
export const useVariants = () => useContext(VariantsContext)

let viewSent = false

/** Radice della landing: fissa attribuzione e varianti, manda page_view e scroll_depth (§5.1). */
export function Session({ variants, children }: { variants: Variants; children: React.ReactNode }) {
  useEffect(() => {
    const c = initContext(variants)
    // Una sola page_view per caricamento, anche con il doppio effetto di StrictMode in sviluppo.
    if (!viewSent) {
      viewSent = true
      track("page_view", { medium: c.medium, content: c.content, referrer: c.referrer })
    }

    const sent = new Set<number>()
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - window.innerHeight
      const pct = max <= 0 ? 100 : (window.scrollY / max) * 100
      for (const step of [25, 50, 75, 100]) {
        if (pct >= step - 1 && !sent.has(step)) {
          sent.add(step)
          track("scroll_depth", { percentuale: step })
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [variants])

  return <VariantsContext.Provider value={variants}>{children}</VariantsContext.Provider>
}
