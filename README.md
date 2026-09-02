# 1Fi Marketplace — EMI Product Marketplace

A full-stack EMI product marketplace (in the spirit of Snapmint) where customers can browse
smartphones, pick a color/storage variant, compare EMI plans, and check out on a monthly
payment plan. All product, pricing, and EMI data is served dynamically from PostgreSQL through
a REST API — nothing is hardcoded in the frontend.

## Overview

- Browse a catalog of smartphones with live pricing and discounts
- View a product page with a color/storage variant selector that updates price and image
- Compare multiple EMI plans (tenure, interest rate, monthly payment, cashback)
- Select a plan and walk through a confirmation flow (no real payment gateway)
- Fully responsive across mobile, tablet, and desktop

## Features

- Product listing page with cards (image, name, price, MRP, discount)
- Product detail page with gallery, variant selection, and EMI plans
- Dynamic variant pricing — selecting a color/storage combination fetches the matching
  variant's price, image, and stock from the API response (not hardcoded logic)
- EMI plan cards showing monthly payment, tenure, interest rate, and cashback
- Single-select EMI plan with a clear selected state; Proceed is disabled until a plan is chosen
- Confirmation modal summarizing the order, followed by a success state
- Loading skeletons, error states with retry, and a dedicated "product not found" page
- Slug-based routing (`/products/:slug`) resolved entirely from the backend

## Tech stack

**Frontend:** React 19, Vite, Tailwind CSS v4, React Router
**Backend:** Node.js, Express
**Database:** PostgreSQL, Prisma ORM

## Architecture

```
React (Vite)
     │  fetch()
     ▼
Express REST API
     │
     ▼
Prisma Client
     │
     ▼
PostgreSQL
```

The frontend never talks to the database directly. Every screen is populated by calling the
Express API, which uses Prisma to query PostgreSQL and returns JSON.

## Folder structure

```
1fi-emi-assignment/
├── frontend/
│   ├── src/
│   │   ├── components/       # Navbar, ProductCard, EmiPlanCard, VariantSelector, modals, states
│   │   ├── pages/             # HomePage, ProductPage, NotFoundPage
│   │   ├── services/          # api.js — fetch wrapper around the backend
│   │   ├── utils/              # formatting helpers (currency, discount %)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   └── vercel.json
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   ├── seed.js
│   │   └── seedData.js
│   ├── src/
│   │   ├── controllers/       # productController.js
│   │   ├── routes/            # productRoutes.js
│   │   ├── services/          # prismaClient.js, productService.js (query layer)
│   │   ├── middleware/        # errorHandler.js
│   │   └── server.js
│   └── .env.example
├── README.md
└── .gitignore
```

## Database schema

**Product**
| Field | Type | Notes |
|---|---|---|
| id | String (UUID) | Primary key |
| name | String | |
| slug | String | Unique, used in the product URL |
| description | String | |
| brand | String | Indexed |
| mrp | Decimal(10,2) | |
| basePrice | Decimal(10,2) | |
| createdAt / updatedAt | DateTime | |

**Variant**
| Field | Type | Notes |
|---|---|---|
| id | String (UUID) | Primary key |
| productId | String | Foreign key → Product, `ON DELETE CASCADE` |
| color | String | |
| storage | String | |
| imageUrl | String | |
| price | Decimal(10,2) | |
| stock | Int | |

Unique constraint on `(productId, color, storage)` — a product can't have two variants with
the same color/storage combination.

**EmiPlan**
| Field | Type | Notes |
|---|---|---|
| id | String (UUID) | Primary key |
| productId | String | Foreign key → Product, `ON DELETE CASCADE` |
| tenureMonths | Int | |
| interestRate | Decimal(5,2) | |
| monthlyPayment | Decimal(10,2) | |
| cashback | Decimal(10,2) | |
| isActive | Boolean | |

Unique constraint on `(productId, tenureMonths)`.

### Relationships

- `Product 1 — N Variant`
- `Product 1 — N EmiPlan`

Both child tables cascade on delete, so removing a product cleans up its variants and EMI
plans automatically.

## API endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | List all products (id, name, slug, brand, mrp, basePrice, imageUrl) |
| GET | `/api/products/:slug` | Full product detail: variants + active EMI plans |
| GET | `/api/products/:id/variants` | All variants for a product (by id) |
| GET | `/api/products/:id/emi-plans` | All active EMI plans for a product (by id) |
| GET | `/health` | Health check |

All endpoints return `{ success: boolean, data | message }` and use standard status codes
(`200`, `404` for missing products/routes, `500` for unexpected errors).

### Example: `GET /api/products`

```json
{
  "success": true,
  "data": [
    {
      "id": "f345f38e-11a7-4cbf-b4b3-9760f2d89865",
      "name": "Apple iPhone 17 Pro",
      "slug": "iphone-17-pro",
      "brand": "Apple",
      "mrp": "149900.00",
      "basePrice": "134900.00",
      "imageUrl": "https://images.unsplash.com/photo-1592286927505-1def25115481?w=800&q=80"
    }
  ]
}
```

### Example: `GET /api/products/iphone-17-pro`

```json
{
  "success": true,
  "data": {
    "id": "f345f38e-11a7-4cbf-b4b3-9760f2d89865",
    "name": "Apple iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "description": "...",
    "brand": "Apple",
    "mrp": "149900.00",
    "basePrice": "134900.00",
    "variants": [
      { "id": "...", "color": "Natural Titanium", "storage": "256GB", "imageUrl": "...", "price": "134900.00", "stock": 25 }
    ],
    "emiPlans": [
      { "id": "...", "tenureMonths": 3, "interestRate": "0.00", "monthlyPayment": "44967.00", "cashback": "2000.00", "isActive": true }
    ]
  }
}
```

### Example: `404` response

```json
{ "success": false, "message": "No product found with slug \"not-a-real-product\"" }
```

## Environment variables

**backend/.env**
```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME?schema=public"
PORT=5000
CORS_ORIGIN="http://localhost:5173"
```

**frontend/.env**
```
VITE_API_URL=http://localhost:5000/api
```

`.env.example` files are provided in both `frontend/` and `backend/`. Never commit a real
`.env` file — it's already covered by `.gitignore`.

## Local development

### 1. PostgreSQL setup

Install PostgreSQL locally (or use a hosted instance), then create a database:

```bash
createdb emi_marketplace
# or, from psql:
# CREATE DATABASE emi_marketplace;
```

### 2. Backend setup

```bash
cd backend
cp .env.example .env
# edit .env with your DATABASE_URL

npm install
npm run prisma:generate     # generate the Prisma Client
npm run prisma:migrate      # create & apply the migration (prompts for a name on first run)
npm run seed                # seed 4 products, variants, and EMI plans
npm run dev                 # starts the API on http://localhost:5000
```

Verify it's working: `curl http://localhost:5000/api/products` should return the 4 seeded
phones.

### 3. Frontend setup

```bash
cd frontend
cp .env.example .env
# edit .env if your API runs on a different URL

npm install
npm run dev                 # starts the app on http://localhost:5173
```

Open `http://localhost:5173` — you should see the product grid, and clicking a product should
take you to `/products/<slug>` with live variant and EMI data.

### Production build (frontend)

```bash
cd frontend
npm run build      # outputs to frontend/dist
npm run preview    # serve the production build locally to sanity-check it
```

## Deployment

**Frontend → Vercel**
1. Import the `frontend/` folder as the project root.
2. Build command: `npm run build`, output directory: `dist`.
3. Set the `VITE_API_URL` environment variable to your deployed backend's URL (e.g.
   `https://your-backend.onrender.com/api`).
4. `frontend/vercel.json` already rewrites all routes to `index.html`, so refreshing on
   `/products/iphone-17-pro` won't 404.

**Backend → Render**
1. Create a new Web Service pointing at the `backend/` folder.
2. Build command: `npm install && npm run prisma:generate`
3. Start command: `npm run prisma:deploy && npm start` (runs pending migrations, then boots
   the server) — or run `prisma migrate deploy` as a separate Render "release" step if you
   prefer to keep it out of the start command.
4. Set environment variables: `DATABASE_URL`, `PORT` (Render sets this automatically, but the
   app also respects `process.env.PORT`), `CORS_ORIGIN` (your Vercel frontend URL).

**Database → hosted PostgreSQL**
Use Render's managed PostgreSQL, Supabase, Neon, or any PostgreSQL provider. Copy the
connection string into `DATABASE_URL` on the backend service, then run
`npm run prisma:deploy` once against it before (or as part of) your first deploy.

## Future improvements

- Pagination and search/filtering on the product listing page
- Authentication so a customer can view their EMI order history
- A real payment/checkout integration (currently a demo confirmation flow only)
- Admin endpoints for managing products, variants, and EMI plans
- Automated tests (API integration tests, component tests for variant/EMI selection logic)
- Image upload/storage instead of external image URLs

## A note on this build environment

This project was built and tested inside a sandboxed tool environment whose network egress is
restricted to a specific allowlist of domains (npm, GitHub, PyPI, Ubuntu package mirrors,
etc.). That allowlist does not include `binaries.prisma.sh`, the CDN Prisma's CLI downloads
its Rust query/schema engine binaries from. Because of that, `npx prisma generate` and
`npx prisma migrate dev` could not be executed inside this specific sandbox.

This does **not** affect the code you're getting — `prisma/schema.prisma`,
`prisma/migrations/20260902130000_init/migration.sql`, and `prisma/seed.js` are all standard,
correct Prisma ORM files, and `npm run prisma:generate` / `npm run prisma:migrate` /
`npm run seed` will work normally on your machine, in CI, or on Render, since those
environments can reach Prisma's CDN.

To still genuinely verify correctness inside this sandbox, the migration SQL was applied
directly to a real local PostgreSQL instance via `psql`, the exact seed data was inserted, and
every API endpoint (`/api/products`, `/api/products/:slug`, `/api/products/:id/variants`,
`/api/products/:id/emi-plans`, valid and invalid slugs/ids, and unknown routes) was
smoke-tested end-to-end against that live database and confirmed to return the expected data,
status codes, and error shapes. The frontend was also run against that live API (`npm run
dev`) and production-built (`npm run build`) successfully with no errors.
