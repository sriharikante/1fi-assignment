const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatINR(value) {
  return inr.format(Number(value));
}

export function calcDiscountPercent(mrp, price) {
  const mrpNum = Number(mrp);
  const priceNum = Number(price);
  if (!mrpNum || mrpNum <= priceNum) return 0;
  return Math.round(((mrpNum - priceNum) / mrpNum) * 100);
}
