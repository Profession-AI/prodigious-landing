import { NextResponse } from "next/server"
import { validateLead, type Lead } from "@/lib/lead"

/* Riceve la candidatura e la inoltra a LEAD_WEBHOOK_URL (CRM, automazione, foglio).
   Senza webhook: in sviluppo la stampa nel log; in produzione rifiuta, così nessun
   lead si perde in silenzio. */

export async function POST(req: Request) {
  let body: Partial<Lead>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Richiesta non valida." }, { status: 400 })
  }

  const errors = validateLead(body)
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 })

  const lead = {
    ...body,
    ricevuta_il: new Date().toISOString(),
    user_agent: req.headers.get("user-agent") ?? "",
  }

  const hook = process.env.LEAD_WEBHOOK_URL
  if (!hook) {
    if (process.env.NODE_ENV === "production") {
      console.error("[candidatura] LEAD_WEBHOOK_URL non configurato: candidatura non salvata")
      return NextResponse.json({ ok: false, error: "Invio non configurato." }, { status: 503 })
    }
    console.info("[candidatura]", JSON.stringify(lead, null, 2))
    return NextResponse.json({ ok: true })
  }

  try {
    const r = await fetch(hook, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(lead) })
    if (!r.ok) throw new Error(`webhook ${r.status}`)
  } catch (err) {
    console.error("[candidatura] inoltro fallito", err)
    return NextResponse.json({ ok: false, error: "Invio fallito." }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
