import { Link } from "react-router-dom";

export default function Navbar() {
  return <header className="sticky top-0 z-40 border-b border-line/80 bg-canvas/90 backdrop-blur-xl">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
      <Link to="/" className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink font-display text-sm font-extrabold text-white shadow-lg">1F</span>
        <div><span className="block font-display text-lg font-extrabold tracking-tight text-ink">1Fi</span><span className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-faint sm:block">Smartphone marketplace</span></div>
      </Link>
      <nav className="flex items-center gap-3 text-sm font-semibold">
        <span className="hidden text-ink-soft md:inline">Flexible EMIs · Transparent pricing</span>
        <Link to="/" className="rounded-xl border border-line bg-surface px-4 py-2.5 text-ink transition hover:border-brand hover:text-brand">Browse phones</Link>
      </nav>
    </div>
  </header>;
}
