"use client"

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react"

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

/** true la prima volta che l'elemento entra in viewport. */
export function useInView<T extends HTMLElement>(threshold = 0) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setInView(true); io.unobserve(e.target) } }),
      { threshold, rootMargin: "0px 0px -10% 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return { ref, inView }
}

/** true mentre l'elemento è visibile (per mettere in pausa le animazioni fuori schermo). */
export function useVisible<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === "undefined") { setVisible(true); return }
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return { ref, visible }
}

type RevealProps = { children: ReactNode; className?: string; as?: ElementType; threshold?: number; [key: string]: unknown }

/** Scroll-reveal del design system. Le prop extra (id, ecc.) passano all'elemento. */
export function Reveal({ children, className = "", as, threshold, ...rest }: RevealProps) {
  const Tag = (as ?? "div") as ElementType
  const { ref, inView } = useInView<HTMLElement>(threshold)
  return (
    <Tag ref={ref} className={`pai-reveal ${inView ? "in" : ""} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

/** Tre puntini "sta scrivendo". */
export function TypingDots({ label = "sta scrivendo" }: { label?: string }) {
  return (
    <span className="flex gap-1 py-1" role="status" aria-label={label}>
      {[0, 1, 2].map((i) => (
        <span key={i} className="size-1.5 rounded-full bg-verde-2 [animation:pai-typing_1.2s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.18}s` }} />
      ))}
    </span>
  )
}
