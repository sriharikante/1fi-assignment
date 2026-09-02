# 1Fi Marketplace — Smartphone EMI Marketplace

A full-stack smartphone marketplace built for the **1Fi SDE-1 Assignment**.

The application allows users to browse smartphones, select color and storage variants, view pricing, compare EMI plans, select an EMI option, and complete a demo confirmation flow.

All product, variant, pricing, and EMI information is retrieved dynamically from a PostgreSQL database through REST APIs. No product catalog data is hardcoded in the frontend.

---

## Live Demo

**Frontend:** `TODO — add deployed URL`

**Backend API:** `TODO — add deployed API URL`

**Demo Video:** `TODO — add Google Drive or YouTube URL`

---

## Assignment Requirements

The application implements the core requirements of the 1Fi assignment:

* Dynamic smartphone product catalog
* Product name, variant, MRP, price, and product image
* Multiple EMI plans
* Monthly payment amount
* EMI tenure
* Interest rate
* Cashback information
* Selectable EMI plans
* Proceed/confirmation flow
* Backend REST APIs
* PostgreSQL database
* Prisma ORM
* Unique product URLs
* At least 3 products
* Multiple variants for each product
* Responsive user interface
* Database schema and seed data

---

## Features

### Product Catalog

* Browse a dynamically loaded smartphone catalog
* Product cards display:

  * Product image
  * Product name
  * Brand
  * MRP
  * Selling price
  * Discount
  * EMI information
  * Cashback information

### Product Details

Each product has a unique URL:

```text
/products/iphone-17-pro
/products/samsung-s24-ultra
/products/google-pixel-9-pro
/products/oneplus-13
```

The product page dynamically loads its data from the backend API.

### Product Variants

Users can select different:

* Colors
* Storage capacities

Selecting a variant updates the displayed:

* Product image
* Price
* Stock information

### EMI Plans

Each product contains multiple EMI plans displaying:

* Monthly payment
* Tenure in months
* Interest rate
* Cashback

Only one EMI plan can be selected at a time.

The Proceed button remains disabled until an EMI plan is selected.

### Confirmation Flow

After selecting a product variant and EMI plan:

1. User clicks Proceed
2. Confirmation modal appears
3. Selected product and EMI information is displayed
4. User confirms the selection
5. Success state is shown

This is a demonstration flow and does not process real payments.

### User Experience

* Responsive design
* Loading skeletons
* Error states
* Retry functionality
* Product-not-found page
* Responsive product grid
* Interactive variant selection
* Interactive EMI selection
* Smooth hover and transition effects

---

## Products

The seeded database currently contains four smartphone products:

| Product                  | Slug                 | Variants |
| ------------------------ | -------------------- | -------: |
| Apple iPhone 17 Pro      | `iphone-17-pro`      |        3 |
| Samsung Galaxy S24 Ultra | `samsung-s24-ultra`  |        3 |
| Google Pixel 9 Pro       | `google-pixel-9-pro` |        3 |
| OnePlus 13               | `oneplus-13`         |        3 |

Each product has multiple color/storage combinations stored in the database.

---

## Tech Stack

### Frontend

* React 19
* Vite
* Tailwind CSS
* React Router
* JavaScript / JSX

### Backend

* Node.js
* Express.js
* REST APIs
* CORS

### Database

* PostgreSQL
* Prisma ORM

### Development Tools

* Git
* GitHub
* Postman / REST API testing
* Render
* Vercel or Render for deployment

---

## Architecture

```text
                    User / Browser
                         │
                         ▼
              ┌─────────────────────┐
              │ React + Vite        │
              │ Frontend            │
              └──────────┬──────────┘
                         │
                    REST API
                         │
                         ▼
              ┌─────────────────────┐
              │ Express.js Backend  │
              │ REST API            │
              └──────────┬──────────┘
                         │
                       Prisma
                         │
                         ▼
              ┌─────────────────────┐
              │ PostgreSQL          │
              │ Product Data        │
              │ Variants            │
              │ EMI Plans           │
              └─────────────────────┘
```

The frontend never connects directly to PostgreSQL.

All product and EMI data is requested through the Express backend API.

---

## Project Structure

```text
1fi-assignment/
│
├── frontend/
│   ├── public/
│   │   ├── products/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── ConfirmationModal.jsx
│   │   │   ├── EmiPlanCard.jsx
│   │   │   ├── ErrorState.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductCardSkeleton.jsx
│   │   │   └── VariantSelector.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProductPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── utils/
│   │   │   └── format.js
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env.example
│   ├── vercel.json
│   ├── vite.config.js
│   └── package.json
│
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   ├── seed.js
│   │   └── seedData.js
│   │
│   ├── src/
│   │   ├── controllers/
│   │   │   └── productController.js
│   │   ├── middleware/
│   │   │   └── errorHandler.js
│   │   ├── routes/
│   │   │   └── productRoutes.js
│   │   ├── services/
│   │   │   ├── prismaClient.js
│   │   │   └── productService.js
│   │   └── server.js
│   │
│   ├── .env.example
│   └── package.json
│
├── .gitignore
├── IMAGE_SETUP.md
└── README.md
```

---

# Database Schema

The database contains three main models.

## Product

| Field         | Type     | Description             |
| ------------- | -------- | ----------------------- |
| `id`          | UUID     | Primary key             |
| `name`        | String   | Product name            |
| `slug`        | String   | Unique product URL slug |
| `description` | String   | Product description     |
| `brand`       | String   | Product brand           |
| `mrp`         | Decimal  | Maximum retail price    |
| `basePrice`   | Decimal  | Base selling price      |
| `createdAt`   | DateTime | Creation timestamp      |
| `updatedAt`   | DateTime | Last update timestamp   |

## Variant

| Field       | Type    | Description         |
| ----------- | ------- | ------------------- |
| `id`        | UUID    | Primary key         |
| `productId` | String  | Product foreign key |
| `color`     | String  | Variant color       |
| `storage`   | String  | Storage capacity    |
| `imageUrl`  | String  | Variant image       |
| `price`     | Decimal | Variant price       |
| `stock`     | Int     | Available stock     |

A unique constraint is applied to:

```text
(productId, color, storage)
```

This prevents duplicate color/storage combinations for the same product.

## EmiPlan

| Field            | Type    | Description                |
| ---------------- | ------- | -------------------------- |
| `id`             | UUID    | Primary key                |
| `productId`      | String  | Product foreign key        |
| `tenureMonths`   | Int     | EMI tenure                 |
| `interestRate`   | Decimal | Interest rate              |
| `monthlyPayment` | Decimal | Monthly EMI                |
| `cashback`       | Decimal | Cashback amount            |
| `isActive`       | Boolean | Whether the plan is active |

A unique constraint is applied to:

```text
(productId, tenureMonths)
```

---

## Database Relationships

```text
Product
   │
   ├───────────────┐
   │               │
   ▼               ▼
Variant         EmiPlan

Product 1 ──── N Variant
Product 1 ──── N EmiPlan
```

Both related tables use cascading deletes.

---

# API Endpoints

## Get All Products

```http
GET /api/products
```

Returns all products available in the catalog.

Example:

```json
{
  "success": true,
  "data": [
    {
      "id": "product-id",
      "name": "Apple iPhone 17 Pro",
      "slug": "iphone-17-pro",
      "brand": "Apple",
      "mrp": "149900.00",
      "basePrice": "134900.00",
      "imageUrl": "/products/iphone-17-pro-natural-titanium.svg"
    }
  ]
}
```

---

## Get Product by Slug

```http
GET /api/products/:slug
```

Example:

```http
GET /api/products/iphone-17-pro
```

Returns:

* Product information
* Variants
* Prices
* Images
* Stock
* Active EMI plans

Example response:

```json
{
  "success": true,
  "data": {
    "name": "Apple iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "brand": "Apple",
    "mrp": "149900.00",
    "basePrice": "134900.00",
    "variants": [
      {
        "color": "Natural Titanium",
        "storage": "256GB",
        "imageUrl": "/products/iphone-17-pro-natural-titanium.svg",
        "price": "134900.00",
        "stock": 25
      }
    ],
    "emiPlans": [
      {
        "tenureMonths": 3,
        "interestRate": "0.00",
        "monthlyPayment": "44967.00",
        "cashback": "2000.00",
        "isActive": true
      }
    ]
  }
}
```

---

## Get Product Variants

```http
GET /api/products/:id/variants
```

Returns all variants for a product.

---

## Get EMI Plans

```http
GET /api/products/:id/emi-plans
```

Returns all active EMI plans for a product.

---

## Health Check

```http
GET /health
```

Example:

```json
{
  "success": true,
  "message": "API is healthy"
}
```

---

## Error Handling

The API uses standard HTTP status codes:

```text
200 → Successful request
404 → Product or route not found
500 → Unexpected server error
```

Example:

```json
{
  "success": false,
  "message": "No product found with slug \"invalid-product\""
}
```

---

# Environment Variables

## Backend

Create:

```text
backend/.env
```

Example:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME?schema=public"
PORT=4000
CORS_ORIGIN="http://localhost:5173"
```

## Frontend

Create:

```text
frontend/.env
```

Example:

```env
VITE_API_URL=http://localhost:4000/api
```

### Security

Real `.env` files must never be committed to GitHub.

Only `.env.example` files are included in the repository.

---

# Local Development

## 1. Clone the Repository

```bash
git clone https://github.com/sriharikante/1fi-assignment.git
cd 1fi-assignment
```

---

## 2. Backend Setup

```bash
cd backend
npm install
```

Create the environment file:

```bash
cp .env.example .env
```

Add your PostgreSQL connection string to `.env`.

Generate Prisma Client:

```bash
npm run prisma:generate
```

Apply database migrations:

```bash
npm run prisma:migrate
```

Seed the database:

```bash
npm run seed
```

Start the backend:

```bash
npm run dev
```

The API runs on:

```text
http://localhost:4000
```

Test:

```text
http://localhost:4000/health
```

or:

```text
http://localhost:4000/api/products
```

---

## 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Create:

```text
frontend/.env
```

Add:

```env
VITE_API_URL=http://localhost:4000/api
```

Start the frontend:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

# Production Build

From the frontend directory:

```bash
npm run build
```

The production build is generated in:

```text
frontend/dist
```

To preview the production build:

```bash
npm run preview
```

---

# Deployment

The application can be deployed using services such as Render and Vercel.

## PostgreSQL

The production database can be hosted using:

* Render PostgreSQL
* Supabase
* Neon
* Another PostgreSQL provider

The database connection string is configured using:

```text
DATABASE_URL
```

---

## Backend

Deploy the Express backend as a Render Web Service.

Backend environment variables:

```text
DATABASE_URL=<production PostgreSQL connection string>
PORT=<Render provided port>
CORS_ORIGIN=<deployed frontend URL>
```

Build command:

```bash
npm install && npm run prisma:generate
```

Start command:

```bash
npm run prisma:deploy && npm start
```

---

## Frontend

The Vite React frontend can be deployed using Vercel.

Build command:

```bash
npm run build
```

Output directory:

```text
dist
```

Set:

```env
VITE_API_URL=<deployed backend API URL>/api
```

The frontend contains a route rewrite configuration so that direct navigation and refreshes on product URLs continue to work.

---

# GitHub Repository

Source code:

`https://github.com/sriharikante/1fi-assignment`

The repository contains:

* Frontend source code
* Backend source code
* Prisma schema
* Prisma migrations
* Seed data
* API implementation
* README
* Product assets
* Environment examples

Sensitive environment files and generated dependencies are excluded using `.gitignore`.

---

# Testing Checklist

Before submission, verify:

* [x] Product catalog loads from backend API
* [x] PostgreSQL database connected
* [x] Prisma schema implemented
* [x] Seed data implemented
* [x] At least 3 products
* [x] Multiple variants per product
* [x] Unique product URLs
* [x] Product image changes with variant
* [x] Product price changes with variant
* [x] EMI plans load dynamically
* [x] EMI plan selection works
* [x] Proceed button requires EMI selection
* [x] Confirmation flow works
* [x] Loading states implemented
* [x] Error states implemented
* [x] Product-not-found page implemented
* [x] Responsive UI
* [ ] Production deployment
* [ ] Live demo URL added
* [ ] Demo video added

---

# Future Improvements

Possible improvements for a production version:

* User authentication
* Customer EMI order history
* Search and filtering
* Pagination
* Real payment gateway integration
* Admin product management
* Automated API and frontend tests
* Image storage using cloud object storage
* Order management
* EMI eligibility checks
* Production monitoring and logging

---

# Assignment Deliverables

### GitHub Repository

`https://github.com/sriharikante/1fi-assignment`

### Deployed Demo

`TODO — add URL after deployment`

### Demo Video

`TODO — add Google Drive or YouTube URL after recording`

The demo video should showcase:

1. Product listing
2. Product details
3. Variant selection
4. EMI plan selection
5. Confirmation flow
6. Backend API
7. PostgreSQL database
8. Overall application functionality
