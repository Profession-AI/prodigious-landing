# Prodigious Superintelligence — landing per smoke test

Landing di `prodigious.si` per misurare l'intenzione d'acquisto per ruolo C-level, fonte di traffico e situazione di partenza. Next.js 16 (App Router), Tailwind v4, TypeScript. Registro **marketing** del [design system ProfessionAI](https://github.com/Profession-AI/design-system) (canvas `#091314`, General Sans + Atkinson, teal = azione, rosso solo per errori), con le ricette di `aipowered.it` (kicker `//`, CTA pill con freccia mono, microcopy con `·`, widget "online · simulato").

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
```

## Dove sta cosa

| Percorso | Cosa |
|---|---|
| `lib/content.ts` | Tutto il copy, i posti del pilota (`PILOTA`), le opzioni del form. |
| `lib/meridiane.ts` | **Unico file dati** di Officine Meridiane S.r.l., letto da tutti i widget (W1, W2, W3, W5, W7). Cambi un numero qui, cambia ovunque. |
| `lib/track.ts` | `track(event, props)` → `window.dataLayer`, con fonte/campagna/varianti allegate a ogni evento. |
| `lib/variants.ts` | Varianti A/B del §7. |
| `lib/lead.ts` + `app/api/candidatura/route.ts` | Validazione condivisa e invio della candidatura. |
| `components/widgets/` | W1–W7 (W8 è in `components/candidatura.tsx`). |
| `app/grazie/` | Thank-you page con link al calendario (`call_booked`). |

## Configurazione (`.env.local`)

| Variabile | Cosa |
|---|---|
| `LEAD_WEBHOOK_URL` | Dove va in POST JSON ogni candidatura (CRM, automazione, foglio). **In produzione senza questa variabile il form risponde con errore**, così nessun lead si perde in silenzio. In sviluppo la candidatura finisce nel log del server. |
| `NEXT_PUBLIC_GTM_ID` | Container GTM. Senza, gli eventi restano in `window.dataLayer` (in sviluppo anche in console). |
| `NEXT_PUBLIC_CALENDAR_URL` | Link al calendario delle call nella thank-you page. Senza, apre una mail a humans@profession.ai. |

## Varianti (§7)

Via query string, una alla volta: `?hero=b` · `?prezzo=richiesta` · `?confronto=off` · `?cta=b`. Le varianti viaggiano su ogni evento e nella candidatura (`contesto.variants`). Con `?prezzo=richiesta` spariscono anche W4 e la riga di confronto, che altrimenti rivelerebbero il prezzo.

## Tracciamento (§5.1)

`page_view` (fonte, campagna, varianti) · `scroll_depth` 25/50/75/100 · `role_card_click` (ruolo, posizione 1–5) · `pricing_view` (secondi in sezione) · `step04_expand` · `widget_interact` (widget W1–W7, azione, dettagli) · `cta_click` (posizione) · `form_start` · `form_submit` (manager, chi segue l'area, ruolo di chi compila, dipendenti, fatturato, innesco, fonti da W5) · `form_error` · `call_booked`. Extra: `faq_open`.

Fonte = `utm_source`, altrimenti dominio del referrer, altrimenti `diretto`; fissata per la sessione.

## Scelte fatte dove il documento lasciava spazio

- **Schede manager**: schede compatte (area, ruolo, la domanda, CTA) in un nastro infinito che scorre da solo e si ferma al passaggio del mouse o al tocco; il dettaglio (cosa legge, cosa dice, W2) si apre sotto con «cosa fa». Ordine casuale per sessione, posizione tracciata; `role_card_detail` misura chi apre il dettaglio. Il click su "Parto dal X" precompila il form.
- **Passo 04**: visibile a tutti ma chiuso, con etichetta "opzionale" e bordo tratteggiato. Così si misura `step04_expand` senza spostare l'attenzione dal prodotto.
- **W5**: il bottone precompila "Da quale manager partiresti" (il primo che si accende) e il campo nascosto `fonti_dichiarate`. Il documento dice "chi segue l'area", ma gli interruttori descrivono i dati, non le persone.
- **W4**: un manager Prodigious copre un'area, quindi il confronto è sempre con un solo manager (setup/12 + canone = 732 €/mese) a ogni taglia. Barre umane a costo azienda (RAL × 1,35 / 12): responsabile di area a tempo pieno (RAL 55–85k), junior (RAL 32–38k), direttore part-time esterno (1.500–3.000 €). Ipotesi da sostituire con fonti.
- **Date di W1**: "lunedì 2 novembre" (nel 2026 il 3 novembre è martedì).
- **W2, W3, W7**: briefing, domande e conversazioni per CMO/CSO/COO/CTO scritti da zero con numeri coerenti con quelli del documento (es. W7 arriva a "5 su 8 · 14.200 €" se accetti le prime due righe libere).
- **Logo**: lockup ProfessionAI dal design system (`resources/logos/logo.svg`, mai sotto 126px); "Prodigious" come testo del prodotto, come "AI Powered Italy". Favicon: set ProfessionAI.

## Prima di pubblicare (§8)

- [ ] Fonti dei tre numeri in "// il problema" (oggi "fonte da verificare"): senza fonte il numero si toglie.
- [ ] Fonti delle barre umane in W4 (oggi "fonti da inserire").
- [ ] Prezzi definitivi (2.900 € / 490 €) e prezzo del secondo manager → `PREZZI` in `lib/content.ts`, poi la formula di W4.
- [ ] Quinto ruolo CTO vs CHRO (oggi CTO).
- [ ] FAQ 01, ultima frase: nascosta finché `FAQ01_PILOTA_VERIFICATO` è `false`.
- [ ] FAQ 09: nome proprio da confermare.
- [ ] `PILOTA.disponibili`: aggiornare a mano solo con candidature accettate; a 0 la pagina passa alla lista d'attesa.
- [ ] `LEAD_WEBHOOK_URL`, `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_CALENDAR_URL`.
- [ ] Immagine Open Graph.
