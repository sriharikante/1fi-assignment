import { formatINR } from "../utils/format";

export default function EmiPlanCard({ plan, selected, onSelect }) {
  return (
    <button type="button" onClick={() => onSelect(plan.id)} aria-pressed={selected}
      className={`group flex w-full items-center justify-between rounded-2xl border p-4 text-left transition duration-200 ${selected ? "border-brand bg-brand-soft shadow-sm ring-1 ring-brand" : "border-line bg-surface hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md"}`}>
      <div className="flex items-center gap-3">
        <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${selected ? "border-brand bg-brand" : "border-line group-hover:border-brand/50"}`}>
          {selected && <span className="h-2.5 w-2.5 rounded-full bg-white" />}
        </span>
        <div>
          <p className="font-display text-lg font-extrabold text-ink">{formatINR(plan.monthlyPayment)}<span className="ml-1 text-xs font-medium text-ink-soft">/mo</span></p>
          <p className="mt-0.5 text-xs text-ink-soft">{plan.tenureMonths} months · {Number(plan.interestRate)}% interest</p>
        </div>
      </div>
      {Number(plan.cashback) > 0 && <span className="rounded-full bg-cashback-soft px-3 py-1.5 text-xs font-bold text-cashback">{formatINR(plan.cashback)} back</span>}
    </button>
  );
}
