import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import ErrorState from "../components/ErrorState";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");
  async function loadProducts() { setStatus("loading"); try { const data = await getProducts(); setProducts(data || []); setStatus("success"); } catch (error) { setErrorMessage(error.message); setStatus("error"); } }
  useEffect(() => { loadProducts(); }, []);
  return <main>
    <section className="border-b border-line bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_.8fr]">
          <div>
            <span className="inline-flex rounded-full border border-brand/20 bg-brand-soft px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-brand">Smartphone financing, simplified</span>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-ink sm:text-5xl lg:text-6xl">Your next phone.<br/><span className="text-brand">Pay it your way.</span></h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-ink-soft sm:text-lg">Compare flagship phones, choose your configuration, and spread the cost across flexible EMI plans with transparent pricing and cashback.</p>
            <div className="mt-7 flex flex-wrap gap-3 text-sm font-semibold"><span className="rounded-xl bg-cashback-soft px-4 py-2.5 text-cashback">✓ Cashback on select plans</span><span className="rounded-xl bg-canvas px-4 py-2.5 text-ink-soft">✓ Live catalog pricing</span></div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[['4','Flagship phones'],['3','Configurations each'],['24','Month max tenure']].map(([n,l]) => <div key={l} className="rounded-2xl border border-line bg-canvas p-4"><p className="font-display text-2xl font-extrabold text-ink">{n}</p><p className="mt-1 text-xs leading-4 text-ink-soft">{l}</p></div>)}
          </div>
        </div>
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
      <div className="mb-7 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">The catalog</p><h2 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Choose your next flagship</h2></div><p className="hidden text-sm text-ink-soft sm:block">Pricing and plans are loaded from the backend.</p></div>
      {status === "loading" && <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">{Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i}/>)}</div>}
      {status === "error" && <ErrorState title="Couldn't load products" message={errorMessage} onRetry={loadProducts}/>} 
      {status === "success" && products.length === 0 && <div className="rounded-3xl border border-line bg-surface px-6 py-20 text-center"><p className="font-display text-xl font-bold text-ink">No products yet</p><p className="mt-2 text-sm text-ink-soft">New phones will appear here when added to the catalog.</p></div>}
      {status === "success" && products.length > 0 && <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">{products.map(p => <ProductCard key={p.id} product={p}/>)}</div>}
    </section>
    <section className="border-t border-line bg-ink text-white"><div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:grid-cols-3 lg:px-8">{[['01','Pick a phone','Browse live products and compare configurations.'],['02','Choose an EMI','See monthly payment, tenure, interest and cashback.'],['03','Proceed','Select a plan and review your purchase summary.']].map(([n,t,d]) => <div key={n} className="border-line/20 sm:border-l sm:pl-6"><p className="text-xs font-bold text-white/45">{n}</p><p className="mt-2 font-display text-lg font-bold">{t}</p><p className="mt-1 text-sm leading-6 text-white/60">{d}</p></div>)}</div></section>
  </main>;
}
