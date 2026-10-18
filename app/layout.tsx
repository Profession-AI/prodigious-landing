import type { Metadata, Viewport } from "next"
import { Atkinson_Hyperlegible } from "next/font/google"
import localFont from "next/font/local"
import Script from "next/script"
import { SITE_URL } from "@/lib/content"
import "./globals.css"

const atkinson = Atkinson_Hyperlegible({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-atkinson", display: "swap" })

const generalSans = localFont({
  src: [
    { path: "./fonts/general-sans/general-sans-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/general-sans/general-sans-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/general-sans/general-sans-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/general-sans/general-sans-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-general-sans",
  display: "swap",
})

const TITLE = "Prodigious Superintelligence · Cinque manager virtuali per la tua PMI"
const DESCRIPTION =
  "I tuoi numeri cambiano ogni giorno. Qualcuno dovrebbe leggerli ogni giorno. CFO, CMO, CSO, COO e CTO virtuali che il lunedì ti dicono cosa sta succedendo. Programma pilota, 10 aziende."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s · Prodigious" },
  description: DESCRIPTION,
  authors: [{ name: "ProfessionAI" }],
  openGraph: { type: "website", locale: "it_IT", url: SITE_URL, siteName: "Prodigious Superintelligence", title: TITLE, description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
}

export const viewport: Viewport = { themeColor: "#091314", colorScheme: "dark", width: "device-width", initialScale: 1 }

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${atkinson.variable} ${generalSans.variable}`} suppressHydrationWarning>
      <head>
        {/* La classe "js" attiva reveal e animazioni: senza JavaScript tutto resta visibile e statico. */}
        <Script id="js-flag" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js');window.dataLayer=window.dataLayer||[];" }} />
        {GTM_ID && (
          <Script id="gtm" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');` }} />
        )}
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
