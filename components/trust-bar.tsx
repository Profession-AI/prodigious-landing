import { TRUST_ITEMS } from "@/lib/content"

/** Trust bar scorrevole: chi arriva da LinkedIn non conosce ProfessionAI. */
export function TrustBar() {
  return (
    <div className="overflow-hidden whitespace-nowrap border-y border-border" aria-label="ProfessionAI in numeri">
      <div className="inline-block animate-[scrollL_40s_linear_infinite] py-[11px] font-mono text-[14px] tracking-[0.06em] text-verde">
        {[0, 1, 2, 3].map((dup) => (
          <span key={dup} aria-hidden={dup > 0}>
            {TRUST_ITEMS.map((t) => (
              <span key={t} className="px-[26px]">{t}</span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}
