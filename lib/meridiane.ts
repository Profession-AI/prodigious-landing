/* ═══════════════════════════════════════════════════════════════════════════
   Officine Meridiane S.r.l. — l'unica azienda (inventata) usata in tutte le
   simulazioni della pagina. Se un numero cambia, cambia qui e cambia ovunque.
   32 dipendenti · componentistica B2B · fatturato 4,1 M€ · il titolare fa anche
   da CFO · una responsabile marketing · tre commerciali.
   ═══════════════════════════════════════════════════════════════════════════ */

export type RoleId = "cfo" | "cmo" | "cso" | "coo" | "cto"

export const ROLE_IDS: RoleId[] = ["cfo", "cmo", "cso", "coo", "cto"]

export const AZIENDA = {
  nome: "Officine Meridiane",
  ragioneSociale: "Officine Meridiane S.r.l.",
  dipendenti: 32,
  settore: "componentistica B2B",
  fatturato: "4,1 M€",
  /** Lunedì del briefing di esempio (2 novembre 2026 è lunedì). */
  lunedi: "lunedì 2 novembre",
  sogliaCassa: 80_000,
  cassaOggi: 184_300,
  previsione60: 61_000,
  dataSottoSoglia: "19 dicembre",
  creditiScaduti: 97_400,
  clientiInRitardo: 6,
  clienteRitardatario: "Rossi & Figli",
  creditoRossi: 31_000,
  ordineRossi: 38_000,
  clienteRicorrente: "Termotecnica Adriatica",
  cplLinkedin: 42,
  primoContattoGiorni: 4,
}

/** Riferimento base per i nomi dei ruoli, usato da W1, W2, W3, W5, W7. */
export const ROLE_SHORT: Record<RoleId, string> = { cfo: "CFO", cmo: "CMO", cso: "CSO", coo: "COO", cto: "CTO" }

/* ── W1 · Il briefing del lunedì ─────────────────────────────────────────── */

export type Kpi = { label: string; value: string; delta: string; tone: "up" | "down" | "warn" | "flat"; note?: string }
export type Briefing = {
  role: RoleId
  cadenza: string
  kpi: Kpi[]
  daSapere: string[]
  daFare: string
  fonti: string[]
}

export const BRIEFINGS: Record<RoleId, Briefing> = {
  cfo: {
    role: "cfo",
    cadenza: "briefing CFO",
    kpi: [
      { label: "cassa oggi", value: "184.300 €", delta: "−12% sett. prec.", tone: "down" },
      { label: "previsione a 60 gg", value: "61.000 €", delta: "sotto soglia (80.000 €) il 19 dic", tone: "warn" },
      { label: "crediti scaduti", value: "97.400 €", delta: "su 6 clienti", tone: "flat" },
    ],
    daSapere: [
      "Rossi & Figli ha superato i 45 giorni per la terza volta.",
      "Il costo energia di ottobre è +18% sulla media dei sei mesi.",
      "Due fornitori hanno emesso fattura doppia: stesso importo, stessa data.",
    ],
    daFare: "Sollecitare Rossi & Figli prima di confermare l'ordine nuovo da 38.000 €.",
    fonti: ["Banca Intesa", "SDI fatture", "Gestionale"],
  },
  cmo: {
    role: "cmo",
    cadenza: "briefing CMO",
    kpi: [
      { label: "costo per cliente nuovo", value: "1.840 €", delta: "+9% sul trimestre", tone: "down" },
      { label: "lead del mese", value: "58", delta: "−14% sett. prec.", tone: "down" },
      { label: "costo per lead LinkedIn", value: "42 €", delta: "−3% · il canale migliore", tone: "up" },
    ],
    daSapere: [
      "Google Ads: il costo per lead è passato da 61 € a 96 € in due settimane.",
      "Il 61% dei lead si ferma dopo la richiesta di preventivo: nessuno li ricontatta entro 48 ore.",
      "La newsletter di ottobre ha portato 3 richieste di preventivo con 0 € di spesa.",
    ],
    daFare: "Spostare 1.500 € da Google Ads a LinkedIn fino a fine mese.",
    fonti: ["CRM", "Analytics sito", "LinkedIn Ads", "Google Ads"],
  },
  cso: {
    role: "cso",
    cadenza: "briefing CSO",
    kpi: [
      { label: "pipeline aperta", value: "412.000 €", delta: "+4% sett. prec.", tone: "up" },
      { label: "previsione novembre", value: "318.000 €", delta: "obiettivo 350.000 €", tone: "warn" },
      { label: "tasso di chiusura", value: "23%", delta: "−5 punti sul trimestre", tone: "down" },
    ],
    daSapere: [
      "7 trattative sono ferme da più di 21 giorni: valgono 126.000 €.",
      "Termotecnica Adriatica non ordina da 9 settimane. Ordinava ogni 4.",
      "Zona Nord-Est: tasso di chiusura al 14%, contro il 23% della rete.",
    ],
    daFare: "Chiamare Termotecnica Adriatica prima di giovedì.",
    fonti: ["CRM", "Preventivi", "Ordini gestionale"],
  },
  coo: {
    role: "coo",
    cadenza: "briefing COO",
    kpi: [
      { label: "commesse in ritardo", value: "4 su 37", delta: "+2 sett. prec.", tone: "down" },
      { label: "risposta ai clienti", value: "19 h", delta: "+6 h sulla media", tone: "down" },
      { label: "arretrato ufficio tecnico", value: "23 attività", delta: "+8 sett. prec.", tone: "warn" },
    ],
    daSapere: [
      "L'ufficio tecnico è il collo di bottiglia per 3 settimane su 4.",
      "La commessa 2026-118 slitta di 6 giorni: un disegno aspetta approvazione dal 23 ottobre.",
      "Il report di produzione si compila a mano: 11 ore a settimana, sempre uguale.",
    ],
    daFare: "Spostare l'approvazione dei disegni dal venerdì al martedì.",
    fonti: ["Gestione attività", "Ticket", "Calendario", "Gestionale"],
  },
  cto: {
    role: "cto",
    cadenza: "briefing mensile CTO",
    kpi: [
      { label: "costi tecnologici ricorrenti", value: "3.870 €/mese", delta: "+11% sull'anno", tone: "down" },
      { label: "abbonamenti attivi", value: "27", delta: "6 inutilizzati da 60 gg", tone: "warn" },
      { label: "costo cloud ottobre", value: "640 €", delta: "+38% sett. prec.", tone: "down" },
    ],
    daSapere: [
      "Due strumenti di videoconferenza pagati in parallelo: 1.140 € all'anno.",
      "Il gestionale ha un solo fornitore e un solo tecnico che lo conosce.",
      "9 licenze del software di progettazione, 6 utenti attivi.",
    ],
    daFare: "Disdire entro il 14 novembre l'abbonamento che si rinnova in automatico: 2.280 € all'anno.",
    fonti: ["Fatture fornitori", "Abbonamenti", "Console cloud"],
  },
}

/* ── W2 · Chiedi al manager ──────────────────────────────────────────────── */

export type Domanda = { q: string; a: string }

export const DOMANDE: Record<RoleId, Domanda[]> = {
  cfo: [
    {
      q: "Posso assumere un commerciale a gennaio?",
      a: "Sì, se Rossi & Figli paga entro il 15 dicembre. Altrimenti la cassa scende a 52.000 € a febbraio con il nuovo stipendio, sotto la soglia che hai fissato. Ti conviene chiudere prima quel credito: sono 31.000 €.",
    },
    {
      q: "Mi conviene l'anticipo fatture che propone la banca?",
      a: "Costa 2.400 € all'anno sui volumi attuali. Risolve il problema di dicembre ma non quello di fondo: i tempi di incasso sono saliti da 48 a 61 giorni in sei mesi. Prima quello.",
    },
    {
      q: "Dove sto perdendo margine?",
      a: "Sulla linea B: il costo materia è salito del 14% e il listino è fermo da 18 mesi. Vale 2.800 € al mese.",
    },
  ],
  cmo: [
    {
      q: "Quale canale mi porta i clienti migliori?",
      a: "LinkedIn: costo per lead 42 €, e i clienti arrivati da lì ordinano in media 2,3 volte l'anno. Google Ads porta più lead, ma il 70% non arriva al preventivo. Se devi tagliare, taglia lì.",
    },
    {
      q: "La fiera di marzo vale i 12.000 € che costa?",
      a: "L'ultima ha portato 34 contatti e 4 clienti, cioè 3.000 € a cliente contro i 1.840 € della media. Vale solo se la rete fissa gli appuntamenti prima: l'anno scorso il 60% dei contatti non è mai stato richiamato.",
    },
    {
      q: "Perché i lead sono calati questo mese?",
      a: "Per Google Ads: il costo per lead è salito da 61 € a 96 € e con lo stesso budget ne arrivano meno. Gli altri canali sono stabili. Non è il mercato, è un'asta più cara su tre parole chiave.",
    },
  ],
  cso: [
    {
      q: "Chiudo il mese sull'obiettivo?",
      a: "Con la pipeline di oggi arrivi a 318.000 €, mancano 32.000 €. Due trattative ferme valgono 41.000 €: se si chiudono entrambe ci sei. Sono entrambe della zona Nord-Est.",
    },
    {
      q: "Quale cliente rischio di perdere?",
      a: "Termotecnica Adriatica: ordinava ogni 4 settimane, l'ultimo ordine è di 9 settimane fa. Vale 86.000 € l'anno. Nessuno l'ha chiamata da settembre.",
    },
    {
      q: "Lo sconto del 5% che chiede la rete ha senso?",
      a: "Sui clienti sopra i 50.000 € l'anno sì: chi l'ha avuto ha rinnovato nel 90% dei casi. Sotto quella soglia no: rinnovano lo stesso, all'82%, anche senza sconto. Ti costerebbe 9.600 € l'anno per nulla.",
    },
  ],
  coo: [
    {
      q: "Riesco a prendere la commessa grande di gennaio?",
      a: "La produzione sì, l'ufficio tecnico no: oggi ha 23 attività in arretrato e la commessa ne aggiunge 15 nelle prime due settimane. O si libera il report di produzione, 11 ore a settimana, o si sposta la consegna di dieci giorni.",
    },
    {
      q: "Perché i clienti aspettano tanto una risposta?",
      a: "Perché il 64% delle richieste arriva alla casella generica e resta lì in media 11 ore prima che qualcuno la smisti. Il tempo di risposta vero, dopo lo smistamento, è di 8 ore.",
    },
    {
      q: "Chi è sovraccarico questa settimana?",
      a: "L'ufficio tecnico: 23 attività per due persone, il doppio della media. Il magazzino è sotto la media del 30%. Due delle attività in arretrato sono controlli che il magazzino fa già per altre commesse.",
    },
  ],
  cto: [
    {
      q: "Quanto spendo davvero in software?",
      a: "3.870 € al mese, 46.440 € l'anno, su 27 abbonamenti. Sei non sono usati da più di 60 giorni e valgono 7.300 € l'anno. Nessuno li ha disdetti perché nessuno sapeva che c'erano.",
    },
    {
      q: "Cosa succede se il fornitore del gestionale chiude?",
      a: "Fatture, ordini e magazzino si fermano. Il contratto non prevede l'esportazione completa dei dati e c'è un solo tecnico che conosce il sistema. Prima di rinnovare a marzo, chiedi la clausola di esportazione.",
    },
    {
      q: "Mi conviene passare tutto in cloud?",
      a: "Non tutto. Il gestionale sì: il server in sede costa 3.100 € l'anno tra manutenzione e corrente, e ha otto anni. Il software di progettazione no: i file sono pesanti e la linea dello stabilimento non regge.",
    },
  ],
}

/* ── W3 · I manager si parlano ───────────────────────────────────────────── */

export type ChatMsg = { from: RoleId | "sintesi"; text: string }
export type Decisione = { id: string; label: string; msgs: ChatMsg[] }

export const DECISIONI: Decisione[] = [
  {
    id: "campagna",
    label: "Lancio una campagna da 10.000 €",
    msgs: [
      { from: "cmo", text: "Sul canale che ha reso meglio negli ultimi 90 giorni (LinkedIn Ads, costo per lead 42 €) 10.000 € portano circa 240 lead. Con il tasso di conversione attuale sono 11 clienti nuovi." },
      { from: "cso", text: "11 clienti in due mesi la rete li gestisce, ma 240 lead no: oggi il primo contatto avviene dopo 4 giorni in media. Metà si raffredda prima. O si qualifica a monte, o la spesa rende la metà." },
      { from: "cfo", text: "10.000 € a novembre portano la cassa a 51.000 € a metà dicembre, sotto soglia. A gennaio, dopo gli incassi di fine anno, stanno dentro. Se la campagna è urgente, va con un incasso anticipato." },
      { from: "sintesi", text: "La campagna ha senso a gennaio, su LinkedIn, con una qualifica automatica dei lead prima che arrivino alla rete. A novembre scopre la cassa. Decidi tu." },
    ],
  },
  {
    id: "commerciale",
    label: "Assumo un secondo commerciale",
    msgs: [
      { from: "cso", text: "La zona Nord-Est ha 19 clienti attivi e nessuno dedicato: oggi la segue chi ha tempo. Un commerciale lì vale circa 280.000 € di fatturato al secondo anno, 90.000 € il primo." },
      { from: "cmo", text: "Per tenerlo pieno servono 15 lead al mese in quella zona. Oggi ne arrivano 6. Con 1.200 € al mese su LinkedIn, mirati sulla zona, si arriva a 14." },
      { from: "cfo", text: "Costa 4.100 € al mese tra stipendio e auto. Assunto a gennaio, la cassa resta sopra soglia solo se Rossi & Figli paga entro il 15 dicembre. A marzo il problema non c'è più." },
      { from: "coo", text: "Se arrivano 90.000 € di ordini in più, l'ufficio tecnico non li regge senza togliere il report di produzione a mano. Va fatto prima, non dopo." },
      { from: "sintesi", text: "L'assunzione regge a gennaio se si chiude il credito di Rossi & Figli e si libera l'ufficio tecnico. Altrimenti, a marzo. Decidi tu." },
    ],
  },
  {
    id: "gestionale",
    label: "Cambio gestionale",
    msgs: [
      { from: "cto", text: "Il gestionale attuale costa 6.800 € l'anno, ha un fornitore solo e un tecnico solo. Un gestionale in cloud costa 9.400 € l'anno più 18.000 € di migrazione." },
      { from: "coo", text: "La migrazione ferma ordini e magazzino per due settimane, anche fatta bene. Agosto è l'unico mese in cui le commesse aperte sono meno di 10." },
      { from: "cfo", text: "Tra canone più alto e migrazione, in tre anni costa 25.800 € in più. Si ripaga solo se toglie le 11 ore a settimana del report di produzione: valgono circa 14.000 € l'anno." },
      { from: "cso", text: "Due clienti grandi chiedono il portale ordini. Il gestionale attuale non lo fa, quello nuovo sì. Valgono 140.000 € l'anno." },
      { from: "sintesi", text: "Il cambio ha senso, ad agosto, con il report di produzione automatizzato dentro il progetto. Prima di firmare, la clausola di esportazione dei dati. Decidi tu." },
    ],
  },
]

/* ── W5 · Quanto sei leggibile ───────────────────────────────────────────── */

export type FonteId = "banca" | "fatture" | "crm" | "gestionale" | "attivita" | "analytics"

export const FONTI: { id: FonteId; label: string }[] = [
  { id: "banca", label: "conto corrente collegabile" },
  { id: "fatture", label: "fatturazione elettronica" },
  { id: "crm", label: "CRM" },
  { id: "gestionale", label: "gestionale in cloud" },
  { id: "attivita", label: "strumento di gestione attività" },
  { id: "analytics", label: "analytics del sito" },
]

/** Quali fonti accendono quale manager, e cosa può fare con quelle. */
export const LEGGIBILITA: Record<RoleId, { richiede: FonteId[]; con: string; senza: string }> = {
  cfo: { richiede: ["banca", "fatture"], con: "cassa, previsione a 60 giorni, crediti scaduti", senza: "servono banca e fatture" },
  cmo: { richiede: ["crm"], con: "costo per cliente, funnel, canali", senza: "serve il CRM" },
  cso: { richiede: ["crm"], con: "pipeline, trattative ferme, previsione", senza: "serve il CRM" },
  coo: { richiede: ["attivita"], con: "colli di bottiglia, ritardi, carichi", senza: "serve lo strumento attività" },
  cto: { richiede: ["gestionale", "fatture"], con: "costi ricorrenti, duplicazioni, rinnovi", senza: "servono gestionale e fatture" },
}

/** Righe extra quando una fonte opzionale arricchisce un manager già acceso. */
export const ARRICCHIMENTI: Partial<Record<RoleId, { fonte: FonteId; text: string }>> = {
  cmo: { fonte: "analytics", text: "+ dove si ferma il sito" },
  cfo: { fonte: "gestionale", text: "+ margini per linea" },
}

/* ── W7 · Il registro dei suggerimenti ───────────────────────────────────── */

export type Esito = "accettato" | "modificato" | "rifiutato"
export type Suggerimento = { id: number; data: string; role: RoleId; testo: string; valore: number; esito?: Esito }

/** Le ultime otto settimane. Le prime cinque sono già decise; le ultime tre le decide il visitatore. */
export const SUGGERIMENTI: Suggerimento[] = [
  { id: 1, data: "7 set", role: "cfo", testo: "Contestare la fattura doppia di due fornitori", valore: 4_200, esito: "accettato" },
  { id: 2, data: "14 set", role: "cto", testo: "Disdire lo strumento di videoconferenza doppio", valore: 1_140, esito: "accettato" },
  { id: 3, data: "21 set", role: "cmo", testo: "Spegnere la campagna display ferma a zero conversioni", valore: 2_800, esito: "accettato" },
  { id: 4, data: "28 set", role: "cso", testo: "Scontare del 5% il rinnovo di Termotecnica Adriatica", valore: 1_900, esito: "rifiutato" },
  { id: 5, data: "5 ott", role: "coo", testo: "Spostare l'approvazione disegni al martedì", valore: 2_400, esito: "modificato" },
  { id: 6, data: "12 ott", role: "cfo", testo: "Sollecitare Rossi & Figli prima del nuovo ordine", valore: 3_900 },
  { id: 7, data: "19 ott", role: "cmo", testo: "Spostare 1.500 € da Google Ads a LinkedIn", valore: 2_160 },
  { id: 8, data: "26 ott", role: "cso", testo: "Riassegnare 4 trattative ferme della zona Nord-Est", valore: 1_500 },
]

/** Migliaia sempre col punto (Intl it-IT non raggruppa sotto 10.000): 1.250 €. */
export const fmtEur = (n: number) => `${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €`
