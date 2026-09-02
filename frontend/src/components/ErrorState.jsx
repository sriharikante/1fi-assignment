export default function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this right now. Please try again.",
  onRetry,
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border border-line bg-surface px-6 py-14 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-discount-soft text-discount">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m0 3.75h.007M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
      <p className="text-sm text-ink-soft">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand"
        >
          Try again
        </button>
      )}
    </div>
  );
}
