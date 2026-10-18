"use client"

import { useEffect, useRef, useState } from "react"
import { Reveal, prefersReducedMotion } from "@/components/anim"
import { Kicker, H2, LEAD } from "@/components/section"
import { Arrow, BTN_PRIMARY } from "@/components/ui/cta"
import { W2Chiedi } from "@/components/widgets/w2-chiedi"
import { W3SiParlano } from "@/components/widgets/w3-si-parlano"
import { MANAGER, type Scheda } from "@/lib/content"
import { track } from "@/lib/track"
import { prefillForm } from "@/lib/prefill"

/* // i manager — punto di misura principale (§4.4).
   Cinque schede compatte e identiche (area, ruolo, la domanda, CTA) in un nastro che
   scorre da solo e all'infinito; si ferma quando ci passi sopra o lo tocchi, e si può
   scorrere a mano. Il dettaglio (cosa legge, cosa dice, W2) si apre sotto, una scheda
   alla volta. Ordine ruotato per sessione, ogni CTA tracciato con ruolo e posizione. */

const ORDER_KEY = "prodigious:ordine-schede"
const SPEED = 32 // px al secondo

/** Ordine casuale per sessione (Fisher–Yates), stabile se la pagina si ricarica. */
function useSessionOrder(items: Scheda[]) {
  const [order, setOrder] = useState(items)
  useEffect(() => {
    let ids: string[] | null = null
    try { ids = JSON.parse(sessionStorage.getItem(ORDER_KEY) || "null") } catch { ids = null }
    if (!ids || ids.length !== items.length) {
      ids = items.map((s) => s.role)
      for (let i = ids.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[ids[i], ids[j]] = [ids[j], ids[i]]
      }
      try { sessionStorage.setItem(ORDER_KEY, JSON.stringify(ids)) } catch { /* bloccato */ }
    }
    setOrder(ids.map((id) => items.find((s) => s.role === id)!))
  }, [items])
  return order
}

const choose = (s: Scheda, pos: number, from: string) => {
  track("role_card_click", { ruolo: s.nome, posizione: pos, da: from })
  prefillForm({ manager: s.nome, origine: "scheda" }, false)
}

function Card({ s, pos, clone, selected, onDetail }: { s: Scheda; pos: number; clone: boolean; selected: boolean; onDetail: () => void }) {
  const tab = clone ? -1 : undefined
  return (
    <article
      aria-hidden={clone || undefined}
      className={`flex w-[272px] flex-none flex-col rounded-[16px] border bg-ink-2 p-5 transition-colors sm:w-[300px] ${selected ? "border-verde" : "border-border hover:border-verde/60"}`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-[2rem] font-semibold leading-none">{s.nome}</h3>
        <span className="font-mono text-[12px] tracking-[.04em] text-verde">{s.area}</span>
      </div>
      <p className="mt-4 min-h-[3.9em] font-display text-[1.15rem] font-medium leading-[1.3]">«{s.domanda}»</p>
      <div className="mt-5 flex flex-col gap-2">
        <a href="#candidatura" tabIndex={tab} onClick={() => choose(s, pos, "nastro")} className={`${BTN_PRIMARY} w-full px-5 py-3`}>
          Parto dal {s.nome} <Arrow />
        </a>
        <button
          type="button"
          tabIndex={tab}
          onClick={onDetail}
          aria-expanded={selected}
          aria-controls="manager-dettaglio"
          className={`rounded-full px-4 py-2 font-mono text-[13px] transition-colors ${selected ? "text-verde" : "text-muted-foreground hover:text-foreground"}`}
        >
          {selected ? "lo stai leggendo ↓" : "cosa fa ↓"}
        </button>
      </div>
    </article>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-mono text-[11px] tracking-[.05em] text-muted-foreground">{label}</div>
      <p className="mt-1 text-[15px] leading-[1.55] text-foreground/90">{children}</p>
    </div>
  )
}

/** Dettaglio di una scheda: tutto il resto, una scheda alla volta. */
function Dettaglio({ s, pos }: { s: Scheda; pos: number }) {
  return (
    <div id="manager-dettaglio" key={s.role} className="rounded-[18px] border border-border bg-ink-2 p-[clamp(18px,3vw,30px)] [animation:pai-tick_.35s_cubic-bezier(.16,1,.3,1)_both]">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="font-display text-[1.6rem] font-semibold leading-none">{s.nome}</span>
        <span className="font-mono text-[13px] text-verde">{s.area}</span>
      </div>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div className="grid gap-5 sm:grid-cols-2">
          <Row label="legge">{s.legge}</Row>
          <Row label={s.cadenza.toLowerCase()}>{s.dice}</Row>
          <Row label="ti avvisa subito se">{s.avvisa}</Row>
          <div className="border-l-2 border-verde pl-3">
            <Row label={s.inCaricaLabel.toLowerCase()}>{s.inCarica}</Row>
          </div>
        </div>
        <div className="flex flex-col">
          <W2Chiedi role={s.role} />
          <a href="#candidatura" onClick={() => choose(s, pos, "dettaglio")} className={`${BTN_PRIMARY} mt-6 self-start px-6 py-3`}>
            Parto dal {s.nome} <Arrow />
          </a>
        </div>
      </div>
    </div>
  )
}

export function Manager() {
  const order = useSessionOrder(MANAGER.schede)
  const n = order.length
  const rail = useRef<HTMLDivElement>(null)
  const [sel, setSel] = useState(0) // indice nell'ordine di sessione
  const paused = useRef(false)

  /* Nastro infinito: quattro giri di schede uno dopo l'altro (l'originale è il secondo, regge schermi fino a ~3.900 px). Lo scorrimento resta sempre
     nel giro centrale: appena entra in un giro laterale, salta della lunghezza di un
     giro, senza che la posizione visiva cambi. */
  useEffect(() => {
    const el = rail.current
    if (!el) return
    const loop = () => {
      const c = el.children as HTMLCollectionOf<HTMLElement>
      return c[n].offsetLeft - c[0].offsetLeft
    }
    const wrap = (x: number) => {
      const L = loop()
      if (x < L * 0.5) return x + L
      if (x > L * 1.5) return x - L
      return x
    }
    el.scrollLeft = loop()
    let pos = el.scrollLeft
    let last = 0
    let raf = 0
    let visible = false
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { threshold: 0.2 })
    io.observe(el)
    const still = prefersReducedMotion()

    const tick = (t: number) => {
      const dt = last ? Math.min(t - last, 64) : 0
      last = t
      if (!still && visible && !paused.current) {
        pos = wrap(pos + (SPEED * dt) / 1000)
        el.scrollLeft = pos
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    // Scorrimento a mano: segue la posizione e la riporta nel giro centrale quando si ferma.
    let idle: ReturnType<typeof setTimeout> | undefined
    const onScroll = () => {
      if (!paused.current) return
      pos = el.scrollLeft
      clearTimeout(idle)
      idle = setTimeout(() => { pos = wrap(el.scrollLeft); el.scrollLeft = pos }, 120)
    }
    el.addEventListener("scroll", onScroll, { passive: true })
    return () => { cancelAnimationFrame(raf); io.disconnect(); clearTimeout(idle); el.removeEventListener("scroll", onScroll) }
  }, [n, order])

  // Pausa: mouse sopra, focus dentro, dito sul nastro (riparte 2,5 s dopo).
  const resume = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const pause = () => { clearTimeout(resume.current); paused.current = true }
  const play = (delay = 0) => { clearTimeout(resume.current); resume.current = setTimeout(() => { paused.current = false }, delay) }

  const detail = (i: number) => {
    setSel(i)
    track("role_card_detail", { ruolo: order[i].nome, posizione: i + 1 })
  }

  return (
    <Reveal as="section" id="manager" className="py-[clamp(64px,8vw,108px)]">
      <div className="mx-auto w-full max-w-[1240px] px-[clamp(16px,4vw,52px)]">
        <Kicker>// i manager</Kicker>
        <h2 className={`${H2} max-w-[22ch]`}>
          <span className="pai-out">Cinque manager.</span> <span className="text-verde">Parti da uno.</span>
        </h2>
        <p className={`${LEAD} mt-5 max-w-[66ch]`}>{MANAGER.sub}</p>
      </div>

      <div
        ref={rail}
        aria-label="Le schede dei cinque manager"
        onMouseEnter={pause}
        onMouseLeave={() => play()}
        onFocus={pause}
        onBlur={() => play()}
        onTouchStart={pause}
        onTouchEnd={() => play(2500)}
        onWheel={() => { pause(); play(1500) }}
        className="scrollbar-hide mt-10 flex gap-3 overflow-x-auto px-3 pb-2 [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]"
      >
        {[0, 1, 2, 3].flatMap((giro) =>
          order.map((s, i) => (
            <Card key={`${giro}-${s.role}`} s={s} pos={i + 1} clone={giro !== 1} selected={i === sel} onDetail={() => detail(i)} />
          )),
        )}
      </div>
      <p className="mx-auto mt-3 w-full max-w-[1240px] px-[clamp(16px,4vw,52px)] font-mono text-[12px] text-muted-foreground">
        // si ferma quando ci passi sopra · apri «cosa fa» per leggere il dettaglio
      </p>

      <div className="mx-auto mt-8 w-full max-w-[1240px] px-[clamp(16px,4vw,52px)]">
        {order[sel] && <Dettaglio s={order[sel]} pos={sel + 1} />}

        <p className="mt-10 max-w-[60ch] font-display text-[clamp(1.15rem,1.8vw,1.4rem)] font-medium leading-[1.35]">
          <span className="text-muted-foreground">Non sai da quale partire?</span> Lo decidono i dati che hai già. <span className="text-verde">Nella call lo vediamo in dieci minuti.</span>
        </p>

        <div className="mt-16">
          <div className="font-mono text-[13px] tracking-[.04em] text-muted-foreground">// e quando c'è da decidere, si parlano</div>
          <div className="mt-4">
            <W3SiParlano />
          </div>
        </div>
      </div>
    </Reveal>
  )
}
