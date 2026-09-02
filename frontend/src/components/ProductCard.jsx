import { Link } from "react-router-dom";
import { formatINR, calcDiscountPercent } from "../utils/format";

export default function ProductCard({ product }) {
  const imageUrl = product.imageUrl || product.variants?.[0]?.imageUrl;
  const discount = calcDiscountPercent(product.mrp, product.basePrice);
  const bestPlan = [...(product.emiPlans || [])].sort((a, b) => Number(a.monthlyPayment) - Number(b.monthlyPayment))[0];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-line bg-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-ink/10">
      <Link to={`/products/${product.slug}`} className="relative block aspect-[4/4.6] overflow-hidden bg-gradient-to-br from-[#f7f7f5] to-[#eef0f4]">
        <div className="absolute left-4 top-4 z-10 flex gap-2">
          {discount > 0 && <span className="rounded-full bg-discount-soft px-3 py-1.5 text-xs font-bold text-discount">{discount}% OFF</span>}
          <span className="rounded-full bg-white/85 px-3 py-1.5 text-xs font-semibold text-ink-soft backdrop-blur">EMI ready</span>
        </div>
        <img
          src={imageUrl}
          alt={product.name}
          className="h-full w-full object-contain p-6 transition duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextElementSibling.style.display = "flex"; }}
        />
        <div className="hidden h-full w-full items-center justify-center text-sm font-medium text-ink-faint">Image unavailable</div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">{product.brand}</p>
            <h3 className="mt-1 font-display text-lg font-extrabold tracking-tight text-ink">{product.name}</h3>
          </div>
          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cashback" title="Cashback available" />
        </div>

        <div className="mt-4 flex items-end gap-2">
          <span className="font-display text-2xl font-extrabold text-ink">{formatINR(product.basePrice)}</span>
          {discount > 0 && <span className="mb-1 text-sm text-ink-faint line-through">{formatINR(product.mrp)}</span>}
        </div>

        {bestPlan && (
          <div className="mt-4 rounded-2xl bg-brand-soft px-3.5 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-brand">From</p>
            <p className="mt-0.5 text-sm font-bold text-ink">{formatINR(bestPlan.monthlyPayment)} <span className="font-medium text-ink-soft">/ month</span></p>
            {Number(bestPlan.cashback) > 0 && <p className="mt-1 text-xs font-semibold text-cashback">+ {formatINR(bestPlan.cashback)} cashback</p>}
          </div>
        )}

        <Link to={`/products/${product.slug}`} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-ink px-4 py-3 text-sm font-bold text-white transition hover:bg-brand">
          Explore phone <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
