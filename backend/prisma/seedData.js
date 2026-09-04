// Shared seed data for the 1Fi EMI Marketplace.
// Prices are realistic INR street prices as of early 2026.
// Image URLs point to real, publicly hosted product photography.

export const products = [
  {
    name: "Apple iPhone 17 Pro",
    slug: "iphone-17-pro",
    brand: "Apple",
    description:
      "The iPhone 17 Pro brings a titanium design, the A19 Pro chip, and a pro-grade camera system with 5x optical zoom, built for photography, gaming, and everyday performance.",
    mrp: 149900,
    basePrice: 134900,
    variants: [
      {
        color: "Natural Titanium",
        storage: "256GB",
        price: 134900,
        stock: 25,
        imageUrl:
          "/products/iphone-17-pro-natural-titanium.png",
      },
      {
        color: "Blue Titanium",
        storage: "512GB",
        price: 154900,
        stock: 15,
        imageUrl:
          "/products/iphone-17-pro-blue-titanium.png",
      },
      {
        color: "Black Titanium",
        storage: "1TB",
        price: 174900,
        stock: 10,
        imageUrl:
          "/products/iphone-17-pro-black-titanium..png",
      },
    ],
    emiPlans: [
      { tenureMonths: 3, interestRate: 0, monthlyPayment: 44967, cashback: 2000 },
      { tenureMonths: 6, interestRate: 8, monthlyPayment: 22883, cashback: 3000 },
      { tenureMonths: 12, interestRate: 12, monthlyPayment: 11897, cashback: 5000 },
      { tenureMonths: 24, interestRate: 15, monthlyPayment: 6541, cashback: 7000 },
    ],
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-s24-ultra",
    brand: "Samsung",
    description:
      "Galaxy S24 Ultra combines a titanium frame, a 200MP camera, and built-in Galaxy AI features, with the S Pen included for note-taking and creativity on the go.",
    mrp: 129999,
    basePrice: 109999,
    variants: [
      {
        color: "Titanium Gray",
        storage: "256GB",
        price: 109999,
        stock: 30,
        imageUrl:
          "/products/samsung-s24-ultra-titanium-gray.png",
      },
      {
        color: "Titanium Black",
        storage: "512GB",
        price: 124999,
        stock: 18,
        imageUrl:
          "/products/samsung-s24-ultra-titanium-black.png",
      },
      {
        color: "Titanium Violet",
        storage: "1TB",
        price: 149999,
        stock: 8,
        imageUrl:
          "/products/samsung-s24-ultra-titanium-violet.png",
      },
    ],
    emiPlans: [
      { tenureMonths: 3, interestRate: 0, monthlyPayment: 36666, cashback: 1500 },
      { tenureMonths: 6, interestRate: 8, monthlyPayment: 18697, cashback: 2500 },
      { tenureMonths: 12, interestRate: 12, monthlyPayment: 9717, cashback: 4000 },
      { tenureMonths: 24, interestRate: 15, monthlyPayment: 5341, cashback: 6000 },
    ],
  },
  {
    name: "Google Pixel 9 Pro",
    slug: "google-pixel-9-pro",
    brand: "Google",
    description:
      "Pixel 9 Pro is built around the Google Tensor G4 chip and the latest Gemini-powered camera and assistant features, in a refined aluminum and glass design.",
    mrp: 109999,
    basePrice: 99999,
    variants: [
      {
        color: "Obsidian",
        storage: "128GB",
        price: 99999,
        stock: 22,
        imageUrl:
          "/products/google-pixel-9-pro-obsidian.png",
      },
      {
        color: "Porcelain",
        storage: "256GB",
        price: 109999,
        stock: 20,
        imageUrl:
          "/products/google-pixel-9-pro-porcelain.png",
      },
      {
        color: "Rose Quartz",
        storage: "512GB",
        price: 129999,
        stock: 9,
        imageUrl:
          "/products/google-pixel-9-pro-rose-quartz.png",
      },
    ],
    emiPlans: [
      { tenureMonths: 3, interestRate: 0, monthlyPayment: 33333, cashback: 1200 },
      { tenureMonths: 6, interestRate: 8, monthlyPayment: 16997, cashback: 2000 },
      { tenureMonths: 12, interestRate: 12, monthlyPayment: 8834, cashback: 3500 },
      { tenureMonths: 24, interestRate: 15, monthlyPayment: 4855, cashback: 5000 },
    ],
  },
  {
    name: "OnePlus 13",
    slug: "oneplus-13",
    brand: "OnePlus",
    description:
      "OnePlus 13 pairs the Snapdragon 8 Elite chipset with a Hasselblad-tuned triple camera and 100W fast charging, delivering flagship speed at a sharper price.",
    mrp: 79999,
    basePrice: 69999,
    variants: [
      {
        color: "Midnight Ocean",
        storage: "256GB",
        price: 69999,
        stock: 35,
        imageUrl:
          "/products/oneplus-13-midnight-ocean.png",
      },
      {
        color: "Arctic Dawn",
        storage: "512GB",
        price: 76999,
        stock: 24,
        imageUrl:
          "/products/oneplus-13-arctic-dawn.png",
      },
      {
        color: "Black Eclipse",
        storage: "16GB+1TB",
        price: 84999,
        stock: 12,
        imageUrl:
          "/products/oneplus-13-black-eclipse.png",
      },
    ],
    emiPlans: [
      { tenureMonths: 3, interestRate: 0, monthlyPayment: 23333, cashback: 1000 },
      { tenureMonths: 6, interestRate: 8, monthlyPayment: 11898, cashback: 1500 },
      { tenureMonths: 12, interestRate: 12, monthlyPayment: 6184, cashback: 2500 },
      { tenureMonths: 24, interestRate: 15, monthlyPayment: 3399, cashback: 4000 },
    ],
  },
];
