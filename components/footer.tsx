import Image from "next/image"
import { WRAP } from "@/components/section"
import { PRIVACY_URL } from "@/lib/content"

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#001310]">
      <div className={`${WRAP} py-12`}>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div>
            <div className="font-display text-[1.2rem] font-semibold tracking-[-.02em]">Prodigious<span className="text-verde">.</span></div>
            <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-muted-foreground">
              Cinque manager virtuali per le PMI italiane. Un progetto di ProfessionAI, la prima AI academy d'Italia, dal 2017.
            </p>
            <a href="mailto:humans@profession.ai" className="mt-4 inline-block font-mono text-[14px] text-verde transition-colors hover:text-verde-2">humans@profession.ai</a>
          </div>
          <a href="https://profession.ai" target="_blank" rel="noopener noreferrer" className="shrink-0">
            <Image src="/images/logo.svg" alt="ProfessionAI" width={173} height={28} className="h-7 w-auto" />
          </a>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 md:flex-row md:items-center">
          <p className="text-xs leading-relaxed text-muted-foreground">
            &copy; 2026 ProfessionAI by ProAI SRL · P. IVA 08747810722 · REA BA-647511 · Capitale sociale 25.000 € i.v.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">Privacy policy</a>
            <a href={`${PRIVACY_URL}/cookie-policy`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">Cookie policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
