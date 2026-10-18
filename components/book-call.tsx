"use client"

import { Arrow, BTN_PRIMARY, Micro } from "@/components/ui/cta"
import { track } from "@/lib/track"

/** TODO(pubblicazione): impostare NEXT_PUBLIC_CALENDAR_URL con il link del calendario delle call. */
const CALENDAR_URL = process.env.NEXT_PUBLIC_CALENDAR_URL || "mailto:humans@profession.ai?subject=Call%20pilota%20Prodigious"

export function BookCall() {
  return (
    <div className="mt-8 flex flex-col items-start gap-3.5">
      <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" onClick={() => track("call_booked", {})} className={`${BTN_PRIMARY} px-8 py-[15px] text-[1.05rem]`}>
        Prenota la call di 20 minuti <Arrow />
      </a>
      <Micro items={["con chi costruisce il prodotto", "nessun impegno"]} />
    </div>
  )
}
