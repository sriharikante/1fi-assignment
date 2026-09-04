// Prisma seed script.
// Run with: npm run seed  (which runs `node prisma/seed.js`)
// Safe to re-run: it clears existing rows before inserting fresh seed data.

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { products } from "./seedData.js";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clear existing data (children first because of foreign keys).
  await prisma.emiPlan.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  for (const productData of products) {
    const { variants, emiPlans, ...productFields } = productData;

    const product = await prisma.product.create({
      data: {
        ...productFields,
        variants: { create: variants },
        emiPlans: { create: emiPlans },
      },
    });

    console.log(`Created product: ${product.name} (${product.slug})`);
  }

  console.log("Seeding complete.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
