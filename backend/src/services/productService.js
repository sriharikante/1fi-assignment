// Data-access layer for products, variants and EMI plans.
// Controllers call these functions instead of talking to Prisma directly,
// which keeps query logic in one place and controllers thin.

import prisma from "./prismaClient.js";

const productListSelect = {
  id: true,
  name: true,
  slug: true,
  brand: true,
  mrp: true,
  basePrice: true,
  variants: {
    select: { imageUrl: true },
    take: 1,
  },
};

export async function getAllProducts() {
  const products = await prisma.product.findMany({
    select: productListSelect,
    orderBy: { createdAt: "asc" },
  });

  // Flatten the first variant's image onto the product itself so the
  // frontend list view doesn't need to know about the variants shape.
  return products.map(({ variants, ...product }) => ({
    ...product,
    imageUrl: variants[0]?.imageUrl ?? null,
  }));
}

export async function getProductBySlug(slug) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      variants: true,
      emiPlans: { where: { isActive: true }, orderBy: { tenureMonths: "asc" } },
    },
  });
}

export async function getProductById(id) {
  return prisma.product.findUnique({ where: { id } });
}

export async function getVariantsByProductId(productId) {
  return prisma.variant.findMany({
    where: { productId },
    orderBy: [{ color: "asc" }, { storage: "asc" }],
  });
}

export async function getEmiPlansByProductId(productId) {
  return prisma.emiPlan.findMany({
    where: { productId, isActive: true },
    orderBy: { tenureMonths: "asc" },
  });
}
