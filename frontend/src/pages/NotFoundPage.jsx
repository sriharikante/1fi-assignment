import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="mx-auto max-w-md px-5 py-24 text-center">
      <p className="font-display text-6xl font-extrabold text-line">404</p>
      <p className="mt-3 font-display text-xl font-bold text-ink">Page not found</p>
      <p className="mt-2 text-sm text-ink-soft">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand"
      >
        Back to home
      </Link>
    </main>
  );
}
