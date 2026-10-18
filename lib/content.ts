import type { RoleId } from "@/lib/meridiane"

/* Tutto il copy della pagina, dal documento "Landing page per smoke test".
   Le voci marcate TODO(pubblicazione) sono le decisioni aperte del §8. */

export const SITE_URL = "https://prodigious.si"

/** Posti del pilota: aggiornare a mano dopo ogni candidatura accettata (W8). Mai gonfiare. */
export const PILOTA = { totali: 10, disponibili: 7 }

export const TRUST_ITEMS = [
  "da ProfessionAI",
  "la prima AI academy d'Italia",
  "dal 2017",
  "75.000+ professionisti formati",
  "4.9/5",
]

export const HERO = {
  eyebrow: "prodigious superintelligence · programma pilota · 10 aziende",
  a: ["I tuoi numeri cambiano ogni giorno.", "Qualcuno dovrebbe leggerli ogni giorno."],
  b: ["Nessuno legge i numeri tutti i giorni.", "Nemmeno chi è pagato per farlo."],
  sub: "Cinque manager virtuali, uno per area: finanza, marketing, vendite, operations, tecnologia. Leggono i dati dell'azienda tutti i giorni e il lunedì dicono cosa sta succedendo e cosa fare. Se quel ruolo in azienda non c'è, lo coprono. Se c'è, lavorano con chi lo ricopre. Il contesto su cui ragionano lo costruisce una persona vera, in tre settimane.",
  micro: ["10 posti", "call di 20 minuti", "nessun impegno"],
}

/** TODO(pubblicazione): senza fonte verificata il numero si toglie (§8). */
export const PROBLEMA = {
  title: "Quanto tempo passa tra un numero che cambia e qualcuno che se ne accorge.",
  stats: [
    {
      value: "90 giorni",
      text: "il ritardo medio con cui un'azienda scopre com'è andato un trimestre.",
      punch: "Il commercialista lavora bene. Lavora dopo.",
      source: "fonte da verificare",
    },
    {
      value: "1 su 3",
      text: "le PMI con un controllo di gestione strutturato.",
      punch: "Nelle altre due, il cruscotto è il conto corrente.",
      source: "fonte da verificare",
    },
    {
      value: "4 ore",
      text: "a settimana, il tempo che un direttore di PMI dedica in media ad analizzare i dati della sua area. Il resto è operatività.",
      punch: "Non è pigrizia. È che nessuno ha il lunedì libero.",
      source: "fonte da verificare",
    },
  ],
  close: ["Il problema non è chi hai in azienda. È che nessuno, in nessuna azienda, legge i numeri ogni giorno.", "Da oggi qualcuno lo fa."],
}

export const CON_CHI = {
  title: "Due situazioni. Stesso manager.",
  cols: [
    {
      tag: "se il ruolo non c'è",
      title: "Se il ruolo non c'è",
      text: "Sei tu il CFO, il CMO e il direttore vendite, nei ritagli. Il manager virtuale prende l'area e la segue per te: numeri letti, anomalie segnalate, una priorità a settimana. Tu decidi, lui ti porta le cose da decidere.",
      flow: ["manager virtuale", "tu"],
    },
    {
      tag: "se il ruolo c'è",
      title: "Se il ruolo c'è",
      text: "Hai una persona brava, che ha una settimana piena di cose da fare. Il manager virtuale lavora per lei: legge tutto, segnala quello che merita attenzione, prepara le analisi che altrimenti non avrebbe il tempo di fare. Il briefing arriva prima a lei. A te arriva la sintesi, e lo sapete entrambi.",
      flow: ["manager virtuale", "il tuo manager", "tu, la sintesi"],
    },
  ],
  close: "Non sostituisce nessuno. Fa il lavoro che nessuno in azienda ha tempo di fare: guardare tutti i giorni.",
}

export type Scheda = {
  role: RoleId
  area: string
  nome: string
  domanda: string
  legge: string
  cadenza: string
  dice: string
  avvisa: string
  inCaricaLabel: string
  inCarica: string
}

export const MANAGER = {
  title: "Cinque manager. Parti da uno.",
  sub: "Ragionano sullo stesso contesto aziendale, costruito una volta sola, e si parlano: se il CMO propone una campagna, il CFO dice cosa fa alla cassa, il commerciale dice se il reparto può gestire i lead. Attivi quello che ti serve. Gli altri, quando serve.",
  after: "Non sai da quale partire? Lo decidono i dati che hai già. Nella call lo vediamo in dieci minuti.",
  schede: [
    {
      role: "cfo",
      area: "// finanza",
      nome: "CFO",
      domanda: "Quanta cassa ho tra 60 giorni?",
      legge: "conti correnti, fatture elettroniche emesse e ricevute, il gestionale se c'è.",
      cadenza: "Ti dice ogni lunedì",
      dice: "cassa reale, previsione a 60 giorni, chi paga in ritardo, quale costo è uscito di linea, una cosa da fare questa settimana.",
      avvisa: "la cassa scende sotto la soglia fissata, un cliente supera i termini, un costo ricorrente cambia.",
      inCaricaLabel: "Con il responsabile amministrativo in carica",
      inCarica: "prepara la riconciliazione e il forecast prima che li chieda; lui controlla, corregge, decide.",
    },
    {
      role: "cmo",
      area: "// marketing",
      nome: "CMO",
      domanda: "Quanto mi costa davvero un cliente nuovo?",
      legge: "CRM, analytics del sito, piattaforme pubblicitarie, email marketing.",
      cadenza: "Ti dice ogni lunedì",
      dice: "costo di acquisizione per canale, dove si ferma il funnel, quale campagna spegnere e quale spingere, una cosa da fare questa settimana.",
      avvisa: "il costo per lead sale, una campagna smette di convertire, un canale cala.",
      inCaricaLabel: "Con il responsabile marketing in carica",
      inCarica: "fa il report del lunedì al posto suo, segnala le anomalie, risponde alle domande «e se» prima della riunione. Lui passa dal fare report al prendere decisioni.",
    },
    {
      role: "cso",
      area: "// vendite",
      nome: "CSO",
      domanda: "Quali trattative sto perdendo senza saperlo?",
      legge: "CRM, pipeline, preventivi e ordini, email commerciali se collegate.",
      cadenza: "Ti dice ogni lunedì",
      dice: "trattative ferme da troppo, tasso di chiusura per venditore e per fonte, previsione di fatturato del mese, una cosa da fare questa settimana.",
      avvisa: "un'offerta importante non riceve risposta, un cliente ricorrente smette di ordinare, la pipeline del mese prossimo si svuota.",
      inCaricaLabel: "Con il direttore commerciale in carica",
      inCarica: "tiene pulita la pipeline, prepara la riunione del lunedì con la rete, gli dice quale venditore ha bisogno di una mano prima che si veda nei numeri di fine mese.",
    },
    {
      role: "coo",
      area: "// operations",
      nome: "COO",
      domanda: "Dove si incastra il lavoro, e chi è sovraccarico?",
      legge: "strumenti di gestione attività, calendario, ticket, email operative, gestionale.",
      cadenza: "Ti dice ogni lunedì",
      dice: "colli di bottiglia ricorrenti, tempi di risposta ai clienti, consegne in ritardo, attività che si ripetono identiche e si potrebbero togliere dal tavolo di qualcuno.",
      avvisa: "una commessa slitta, un reparto accumula arretrato, un cliente aspetta una risposta da troppo.",
      inCaricaLabel: "Con il responsabile operativo in carica",
      inCarica: "vede quello che lui non ha tempo di vedere perché sta spegnendo incendi. Gli dice dove sarà il prossimo.",
    },
    {
      role: "cto",
      area: "// tecnologia",
      nome: "CTO",
      domanda: "Quali software sto pagando senza usarli?",
      legge: "fatture di fornitori tecnologici e cloud, abbonamenti, stato dei sistemi, ticket se li tracci.",
      cadenza: "Ti dice ogni mese",
      dice: "mappa dei costi tecnologici ricorrenti, duplicazioni, fornitori da cui dipendi troppo, cosa rinnovare e cosa no.",
      avvisa: "un abbonamento si rinnova in automatico, un costo cloud sale, un sistema critico ha un fornitore solo.",
      inCaricaLabel: "Con il responsabile IT in carica",
      inCarica: "gli toglie l'inventario e il controllo costi, che nessun IT ama fare, e gli lascia il tempo per le cose che richiedono lui.",
    },
  ] satisfies Scheda[],
}

export const COME = {
  title: ["Non è un software da configurare.", "È una persona che viene da te."],
  body: "I prodotti self-service ti chiedono di collegare, caricare, impostare. Poi non funzionano, e la colpa è tua. Noi facciamo il contrario: la parte difficile la fa una persona formata per farla.",
  steps: [
    {
      n: "01",
      title: "La call",
      meta: "20 minuti",
      text: "Ci racconti l'azienda, chi segue oggi l'area che ti interessa, e una decisione che oggi si prende a occhio. Noi verifichiamo che i dati minimi esistano. Se non esistono, te lo diciamo e non ti vendiamo niente.",
    },
    {
      n: "02",
      title: "Il Context Engineer",
      meta: "tre settimane",
      text: "Una persona del nostro team collega le fonti, mappa come lavorate, definisce obiettivi e soglie con te e, se c'è, con il manager dell'area. Due incontri da un'ora, il resto lo fa da solo. Alla fine ricevi la prima fotografia reale dell'azienda. Di solito è diversa da quella che hai in testa.",
    },
    {
      n: "03",
      title: "Il manager entra in servizio",
      meta: "dal primo lunedì",
      text: "Il lunedì arriva il briefing, a chi segue l'area. Quando serve, un avviso. Quando c'è una domanda, una risposta con i tuoi numeri. Nei primi tre mesi, una volta al mese, una persona del team lo rilegge con voi.",
    },
  ],
  step04: {
    n: "04",
    title: "Se vuoi, l'azienda si agentifica",
    text: "Dopo qualche settimana il manager sa dove si perde tempo: il report che qualcuno compila a mano, i solleciti che partono in ritardo, i preventivi che aspettano. Quelli si possono delegare. Costruiamo agenti operativi su misura per quei processi, coordinati dal manager virtuale che li ha indicati: lui assegna, controlla, riporta. Si fa solo se lo chiedi, solo sui processi che il manager ha già visto, e si quota a parte.",
  },
  box: {
    kicker: "// cos'è un context engineer",
    text: "Una figura che formiamo noi per fare una cosa sola: trasformare un'azienda disordinata in un contesto che un'AI può leggere senza sbagliare. I software self-service questa parte la lasciano a te. È il motivo per cui poi non li usi.",
  },
  micro: ["3 settimane di setup", "2 ore del tuo tempo", "poi 5 minuti il lunedì"],
}

/** TODO(pubblicazione): prezzi da confermare (§8). */
export const PREZZI = {
  title: ["Il prezzo.", "Scritto qui, non «su richiesta»."],
  titleRichiesta: ["Il prezzo.", "Lo diciamo in call, per iscritto."],
  setup: { label: "Setup", value: "2.900 €", unit: "una tantum", text: "Il Context Engineer, il collegamento delle fonti, il contesto aziendale, la prima analisi completa. Il contesto resta tuo: serve a ogni manager che attiverai dopo, e te lo porti via se te ne vai." },
  canone: { label: "Canone", value: "490 €/mese", unit: "per manager", text: "Briefing settimanale, avvisi, risposte, contesto aggiornato. Il secondo manager costa meno: il grosso del lavoro è già fatto. Mensile, senza vincolo." },
  agenti: { label: "Agenti operativi · passo 04, opzionale", value: "A preventivo", unit: "per processo", text: "Si quotano solo dopo che il manager ha indicato dove servono. Hanno un costo di realizzazione e un canone di gestione: te li diciamo prima, per iscritto." },
  confronto: "Un direttore part-time esterno: 1.500–3.000 € al mese. Un controller junior: 2.500 € lordi. Un'ora in più a settimana del tuo direttore, per leggere i dati: non si compra.",
  pilota: "Le prime 10 aziende pagano meno e parlano con chi costruisce il prodotto. In cambio, ci dicono cosa non va. Senza filtri.",
  setupEur: 2_900,
  canoneEur: 490,
}

export const NON_FACCIAMO = {
  title: "Quello che non ti promettiamo.",
  lead: {
    title: "Non decide al posto di nessuno.",
    text: "Suggerisce, con i numeri e la fonte. Decide chi deve decidere, e ogni suggerimento resta registrato: accettato, modificato, rifiutato. Dopo tre mesi sai esattamente quanto vale.",
  },
  items: [
    { title: "Non controlla i tuoi manager.", text: "Se il ruolo c'è, il briefing arriva prima a chi lo ricopre. Il sistema lavora per lui, e lui lo sa. Un manager che si sente sorvegliato lo spegne; uno che si sente alleggerito lo usa." },
    { title: "Non sostituisce il commercialista.", text: "Gli consegna numeri in ordine." },
    { title: "Non funziona senza dati.", text: "Banca e fatture elettroniche le hai per forza. Se non hai altro, partiamo da lì. Se non hai nemmeno quello, non fa per te." },
    { title: "Non garantisce una percentuale.", text: "Chi lo fa, non ha visto i tuoi numeri." },
  ],
  close: "Il resto lo scopri in tre settimane. È il tempo che chiediamo.",
}

export const CHI = {
  title: ["Dietro i manager c'è un'academy.", "La prima."],
  text: "ProfessionAI insegna l'intelligenza artificiale a chi lavora dal 2017, prima che fosse di moda. Prodigious nasce da una cosa semplice: il sistema di manager virtuali che usiamo per gestire la nostra azienda. Funzionava con i nostri manager veri. Lo abbiamo reso installabile da altri.",
  stats: [
    { value: "2017", text: "l'anno in cui abbiamo iniziato. L'AI era roba da ricercatori; noi la insegnavamo già ai professionisti." },
    { value: "75.000+", text: "persone hanno iniziato un percorso con noi. Molte lavorano nelle aziende per cui Prodigious è pensato. Alcune sono i manager con cui lavorerà." },
    { value: "4.9/5", text: "la valutazione di chi ha studiato con noi. Non la nostra: la loro." },
  ],
}

/** TODO(pubblicazione): FAQ 01 ultima frase solo se verificata nel pilota interno; FAQ 09 nome da confermare. */
const FAQ01_PILOTA_VERIFICATO = false

export const FAQ = {
  title: "Le domande che ci faresti al telefono.",
  sub: "Le risposte sono scritte, così ci puoi inchiodare a quello che diciamo.",
  items: [
    {
      q: "Ho già un direttore in quell'area. Si offende?",
      a:
        "Dipende da come glielo presenti, e da come lo presentiamo noi. Il briefing arriva prima a lui. Il sistema gli toglie il report del lunedì e gli lascia le decisioni." +
        (FAQ01_PILOTA_VERIFICATO ? " Nelle aziende dove l'abbiamo provato, dopo un mese è lui a chiedere il secondo manager." : ""),
    },
    { q: "Ho già un commercialista. Cosa cambia?", a: "Il commercialista dice com'è andata, a trimestre chiuso. Il CFO dice cosa sta succedendo adesso. Il secondo consegna al primo numeri già in ordine." },
    { q: "I miei dati sono un disastro.", a: "Lo sono quasi sempre. Per questo il setup lo fa un Context Engineer e non un tutorial. Partiamo da banca e fatture elettroniche, che hai comunque." },
    { q: "È un'AI. Quanto sbaglia?", a: "Sbaglia quando il contesto è sbagliato. Per questo il contesto lo costruisce una persona e non te lo chiediamo in un form. Ogni numero è tracciabile alla fonte: lo verifichi in un click." },
    { q: "Devo dare accesso al conto?", a: "In sola lettura, con lo standard bancario europeo (PSD2), revocabile quando vuoi. I dati restano su infrastruttura europea. Nessuno può muovere un euro." },
    { q: "Perché non lo faccio con ChatGPT?", a: "Puoi. Dovrai caricare i dati ogni volta, spiegargli l'azienda ogni volta, ricordarti tu di chiedere. Prodigious lo fa il lunedì senza che tu te ne ricordi, e l'azienda la conosce già." },
    { q: "E se dopo tre mesi non mi serve?", a: "Disdici. Il canone è mensile. Il contesto costruito è tuo e te lo consegniamo in un formato leggibile." },
    { q: "Quanto tempo porta via?", a: "Due ore nel setup. Poi cinque minuti il lunedì. Se ne porta via di più, lo abbiamo fatto male." },
    { q: "Chi c'è dietro?", a: "ProfessionAI. Se vuoi un nome: Giuseppe Gullo, fondatore, fa lui le call del pilota." },
  ],
}

export const CANDIDATURA = {
  title: ["Dieci aziende.", "Una potrebbe essere la tua."],
  sub: "Selezioniamo le prime dieci dai dati che hanno, non dall'ordine di arrivo. Rispondiamo entro due giorni lavorativi con una proposta di call. Se non fa per te, te lo diciamo prima noi.",
  micro: ["risposta entro 2 giorni lavorativi", "call di 20 minuti", "nessun impegno"],
}

export const FORM_OPTIONS = {
  ruolo: ["Titolare", "Socio", "Direttore di area", "Altro"],
  dipendenti: ["<10", "10–25", "26–50", "51–100", ">100"],
  fatturato: ["<500k", "500k–1M", "1–3M", "3–10M", ">10M"],
  manager: ["CFO", "CMO", "CSO", "COO", "CTO", "Non so"],
  area: ["Nessuno, la seguo io", "Una persona interna dedicata", "Un consulente esterno", "Un team"],
  innesco: ["Chiusura bilancio", "Finanziamento", "Nuovo socio o investitore", "Crescita veloce", "Niente di particolare"],
}

export const PRIVACY_URL = "https://www.iubenda.com/privacy-policy/47767621"
