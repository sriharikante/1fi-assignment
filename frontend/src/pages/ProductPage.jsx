import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductBySlug } from "../services/api";
import ErrorState from "../components/ErrorState";
import EmiPlanCard from "../components/EmiPlanCard";
import { ColorSelector, StorageSelector } from "../components/VariantSelector";
import ConfirmationModal from "../components/ConfirmationModal";
import { formatINR, calcDiscountPercent } from "../utils/format";

function calculateEmi(principal, annualInterestRate, tenureMonths) {
  const price = Number(principal);
  const annualRate = Number(annualInterestRate);
  const months = Number(tenureMonths);

  if (!price || !months) {
    return 0;
  }

  // No-interest EMI
  if (annualRate === 0) {
    return Math.round(price / months);
  }

  // Convert annual interest rate to monthly decimal rate
  const monthlyRate = annualRate / 12 / 100;

  // Standard reducing-balance EMI formula
  const emi =
    (price *
      monthlyRate *
      Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  return Math.round(emi);
}

export default function ProductPage() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | success | error | not-found
  const [errorMessage, setErrorMessage] = useState("");

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  async function loadProduct() {
    setStatus("loading");

    try {
      const data = await getProductBySlug(slug);

      setProduct(data);

      const firstVariant = data.variants?.[0];

      setSelectedColor(firstVariant?.color ?? null);
      setSelectedStorage(firstVariant?.storage ?? null);
      setSelectedPlanId(null);

      setStatus("success");
    } catch (error) {
      if (error.status === 404) {
        setStatus("not-found");
      } else {
        setErrorMessage(error.message);
        setStatus("error");
      }
    }
  }

  useEffect(() => {
    loadProduct();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const colors = useMemo(
    () => [...new Set((product?.variants ?? []).map((v) => v.color))],
    [product]
  );

  const storageOptions = useMemo(
    () => [...new Set((product?.variants ?? []).map((v) => v.storage))],
    [product]
  );

  const activeVariant = useMemo(() => {
    if (!product) {
      return null;
    }

    return (
      product.variants.find(
        (v) =>
          v.color === selectedColor &&
          v.storage === selectedStorage
      ) || product.variants[0]
    );
  }, [product, selectedColor, selectedStorage]);

  /*
   * Calculate EMI dynamically from the selected variant price.
   *
   * The following values still come from the database:
   * - tenureMonths
   * - interestRate
   * - cashback
   *
   * monthlyPayment is calculated here using the selected variant price.
   */
  const calculatedEmiPlans = useMemo(() => {
    if (!product?.emiPlans || !activeVariant) {
      return [];
    }

    return product.emiPlans.map((plan) => ({
      ...plan,
      monthlyPayment: calculateEmi(
        activeVariant.price,
        plan.interestRate,
        plan.tenureMonths
      ),
    }));
  }, [product, activeVariant]);

  const selectedPlan = useMemo(
    () =>
      calculatedEmiPlans.find(
        (plan) => plan.id === selectedPlanId
      ) || null,
    [calculatedEmiPlans, selectedPlanId]
  );

  function handleColorChange(color) {
    setSelectedColor(color);

    // Keep the same storage if that combination exists.
    // Otherwise fall back to the first variant available
    // in the newly selected color.
    const stillValid = product.variants.some(
      (v) =>
        v.color === color &&
        v.storage === selectedStorage
    );

    if (!stillValid) {
      const fallback = product.variants.find(
        (v) => v.color === color
      );

      setSelectedStorage(fallback?.storage ?? null);
    }

    // Clear selected EMI because the product price may change.
    setSelectedPlanId(null);
  }

  function handleStorageChange(storage) {
    setSelectedStorage(storage);

    const stillValid = product.variants.some(
      (v) =>
        v.storage === storage &&
        v.color === selectedColor
    );

    if (!stillValid) {
      const fallback = product.variants.find(
        (v) => v.storage === storage
      );

      setSelectedColor(fallback?.color ?? null);
    }

    // Clear selected EMI because the product price changes.
    setSelectedPlanId(null);
  }

  if (status === "loading") {
    return (
      <main className="mx-auto max-w-6xl px-5 py-10">
        <div className="grid animate-pulse grid-cols-1 gap-10 md:grid-cols-2">
          <div className="aspect-square rounded-2xl bg-line/60" />

          <div className="space-y-4">
            <div className="h-4 w-24 rounded bg-line/60" />
            <div className="h-8 w-3/4 rounded bg-line/60" />
            <div className="h-6 w-1/3 rounded bg-line/60" />
            <div className="h-24 w-full rounded bg-line/60" />
          </div>
        </div>
      </main>
    );
  }

  if (status === "not-found") {
    return (
      <main className="mx-auto max-w-md px-5 py-20 text-center">
        <p className="font-display text-2xl font-bold text-ink">
          Product not found
        </p>

        <p className="mt-2 text-sm text-ink-soft">
          We couldn't find a product at "{slug}". It may have
          been removed or the link is incorrect.
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand"
        >
          Back to all phones
        </Link>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="mx-auto max-w-6xl px-5 py-20">
        <ErrorState
          message={errorMessage}
          onRetry={loadProduct}
        />
      </main>
    );
  }

  const discount = calcDiscountPercent(
    product.mrp,
    activeVariant.price
  );

  return (
    <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-12">
      <Link
        to="/"
        className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-ink-soft transition hover:text-brand"
      >
        ← Back to phones
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-12">
        {/* Left: image */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-[30px] border border-line bg-gradient-to-br from-[#f7f7f5] to-[#eceff4] shadow-sm">
            <img
              key={activeVariant.imageUrl}
              src={activeVariant.imageUrl}
              alt={`${product.name} in ${activeVariant.color}`}
              className="h-full w-full object-contain p-8 sm:p-12"
              onError={(e) => {
                e.currentTarget.style.display = "none";

                if (e.currentTarget.nextElementSibling) {
                  e.currentTarget.nextElementSibling.style.display =
                    "flex";
                }
              }}
            />

            <div className="absolute inset-0 hidden items-center justify-center text-sm font-semibold text-ink-faint">
              Image unavailable
            </div>
          </div>
        </div>

        {/* Right: details */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
            {product.brand}
          </p>

          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-[-0.03em] text-ink sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-ink-soft sm:text-base">
            {product.description}
          </p>

          {/* Price */}
          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            <span className="font-display text-2xl font-bold text-ink">
              {formatINR(activeVariant.price)}
            </span>

            {discount > 0 && (
              <>
                <span className="text-base text-ink-faint line-through">
                  {formatINR(product.mrp)}
                </span>

                <span className="rounded-full bg-discount-soft px-2.5 py-1 text-xs font-semibold text-discount">
                  {discount}% off
                </span>
              </>
            )}
          </div>

          {/* Variant selection */}
          <div className="mt-7 space-y-5 rounded-3xl border border-line bg-surface p-5 shadow-sm">
            <ColorSelector
              colors={colors}
              selectedColor={selectedColor}
              onSelect={handleColorChange}
            />

            <StorageSelector
              storageOptions={storageOptions}
              selectedStorage={selectedStorage}
              onSelect={handleStorageChange}
            />
          </div>

          {/* EMI plans */}
          <div className="mt-5 rounded-3xl border border-line bg-surface p-5 shadow-sm">
            <div className="mb-4 flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
                  Flexible financing
                </p>

                <p className="mt-1 text-sm font-bold text-ink">
                  Choose your EMI plan
                </p>
              </div>

              <span className="text-xs text-ink-faint">
                {calculatedEmiPlans.length} plans
              </span>
            </div>

            <div className="space-y-2.5">
              {calculatedEmiPlans.map((plan) => (
                <EmiPlanCard
                  key={plan.id}
                  plan={plan}
                  selected={plan.id === selectedPlanId}
                  onSelect={setSelectedPlanId}
                />
              ))}
            </div>
          </div>

          {/* Cashback */}
          {selectedPlan && (
            <div className="mt-4 rounded-2xl bg-cashback-soft px-4 py-3 text-sm text-cashback">
              <span className="font-bold">
                You save with this plan.
              </span>{" "}
              {formatINR(selectedPlan.cashback)} cashback on
              completion.
            </div>
          )}

          {/* Proceed */}
          <button
            disabled={!selectedPlan}
            onClick={() => setShowConfirmation(true)}
            className="mt-5 w-full rounded-2xl bg-ink py-4 text-sm font-bold text-white shadow-lg shadow-ink/10 transition enabled:hover:-translate-y-0.5 enabled:hover:bg-brand disabled:cursor-not-allowed disabled:bg-line disabled:text-ink-faint"
          >
            {selectedPlan
              ? "Proceed"
              : "Select an EMI plan to proceed"}
          </button>
        </div>
      </div>

      {/* Confirmation modal */}
      {showConfirmation && selectedPlan && (
        <ConfirmationModal
          product={product}
          variant={activeVariant}
          plan={selectedPlan}
          onClose={() => setShowConfirmation(false)}
        />
      )}
    </main>
  );
}