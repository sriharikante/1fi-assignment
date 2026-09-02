import { useState } from "react";
import { formatINR } from "../utils/format";

export default function ConfirmationModal({ product, variant, plan, onClose }) {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-surface p-6 shadow-2xl sm:rounded-3xl">
        {!confirmed ? (
          <>
            <div className="flex items-start justify-between">
              <h2 className="font-display text-xl font-bold text-ink">
                Confirm your order
              </h2>
              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded-full p-1 text-ink-faint hover:bg-canvas hover:text-ink"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-5 flex gap-4 border-b border-line pb-5">
              <img
                src={variant.imageUrl}
                alt={product.name}
                className="h-20 w-20 shrink-0 rounded-xl object-cover"
              />
              <div>
                <p className="font-display font-bold text-ink">{product.name}</p>
                <p className="text-sm text-ink-soft">
                  {variant.color} &middot; {variant.storage}
                </p>
                <p className="mt-1 font-semibold text-ink">{formatINR(variant.price)}</p>
              </div>
            </div>

            <dl className="mt-5 space-y-3 text-sm">
              <Row label="Monthly EMI" value={`${formatINR(plan.monthlyPayment)}/month`} />
              <Row label="Tenure" value={`${plan.tenureMonths} months`} />
              <Row label="Interest rate" value={`${Number(plan.interestRate)}%`} />
              <Row label="Cashback" value={formatINR(plan.cashback)} valueClass="text-cashback" />
            </dl>

            <button
              onClick={() => setConfirmed(true)}
              className="mt-6 w-full rounded-xl bg-brand py-3.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              Confirm order
            </button>
            <p className="mt-3 text-center text-xs text-ink-faint">
              This is a demo checkout. No payment will be collected.
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center py-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cashback-soft text-cashback">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h2 className="mt-4 font-display text-xl font-bold text-ink">Order confirmed</h2>
            <p className="mt-1 max-w-xs text-sm text-ink-soft">
              Your {product.name} on a {plan.tenureMonths}-month EMI is booked. A confirmation
              would normally be sent to your registered number.
            </p>
            <button
              onClick={onClose}
              className="mt-6 w-full rounded-xl bg-ink py-3.5 text-sm font-semibold text-white transition hover:bg-brand"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value, valueClass = "text-ink" }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-ink-soft">{label}</dt>
      <dd className={`font-semibold ${valueClass}`}>{value}</dd>
    </div>
  );
}
