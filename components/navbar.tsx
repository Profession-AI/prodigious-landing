import Image from "next/image"
import Link from "next/link"
import { ApplyButton } from "@/components/ui/cta"

const links = [
  { label: "I manager", href: "/#manager" },
  { label: "Come funziona", href: "/#come-funziona" },
  { label: "Quanto costa", href: "/#prezzo" },
  { label: "Domande", href: "/#domande" },
]

/** Lockup ProfessionAI (file del brand, mai ridisegnato) + nome del prodotto come testo. */
export function Brand() {
  return (
    <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Prodigious Superintelligence, home">
      <span className="font-display text-[1.12rem] font-semibold tracking-[-.02em]">
        Prodigious<span className="text-verde">.</span>
      </span>
      <span aria-hidden className="hidden h-5 w-px bg-border sm:block" />
      <span className="hidden items-center gap-2 font-mono text-[12px] text-muted-foreground sm:flex">
        da
        <Image src="/images/logo.svg" alt="ProfessionAI" width={130} height={21} className="h-[21px] w-auto" priority />
      </span>
    </Link>
  )
}

export function Navbar({ withCta = true }: { withCta?: boolean }) {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 px-[clamp(16px,4vw,52px)]">
        <Brand />
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-lg px-3 py-2 text-[15px] font-medium text-muted-foreground transition-colors hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </div>
        {withCta && <ApplyButton position="navbar" label="Candidati" className="shrink-0 whitespace-nowrap px-5 py-2.5 text-[15px]" />}
      </div>
    </nav>
  )
}
