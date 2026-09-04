# 1Fi Marketplace — Smartphone EMI Marketplace

A full-stack smartphone marketplace built for the **1Fi SDE-1 Assignment**.

The application allows users to browse smartphones, select color and storage variants, view pricing, explore EMI plans, select an EMI option, and complete a demo confirmation flow.

All product, variant, pricing, and EMI plan information is loaded dynamically from a **PostgreSQL database through REST APIs**. No product catalog data is hardcoded in the frontend.

---

## Live Demo

**Application:**
https://onefi-mobiles.onrender.com

**Products API:**
https://onefi-mobiles.onrender.com/api/products

**Health Check:**
https://onefi-mobiles.onrender.com/health

---

## Assignment Requirements

The application implements the core requirements of the 1Fi SDE-1 assignment:

* Dynamic smartphone product catalog
* Product name, variant, MRP, price, and product image
* Multiple EMI plans
* Monthly EMI payment
* EMI tenure
* Interest rate
* Cashback
* Selectable EMI plans
* Proceed and confirmation flow
* Backend REST APIs
* PostgreSQL database
* Prisma ORM
* Unique product URLs
* At least 3 products
* Multiple variants for each product
* Responsive UI
* Database schema and seed data

---

## Features

### Product Catalog

Users can browse a dynamically loaded smartphone catalog.

Each product displays:

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

Product details are fetched from the backend using the product slug.

### Product Variants

Users can select different:

* Colors
* Storage capacities

Changing a variant updates:

* Product image
* Product price
* Stock information
* EMI amount

### EMI Plans

Each product has multiple EMI plans containing:

* Monthly payment
* Tenure
* Interest rate
* Cashback

The monthly EMI is calculated dynamically based on the selected variant price, interest rate, and tenure.

Only one EMI plan can be selected at a time.

The **Proceed** button becomes available after selecting an EMI plan.

### Confirmation Flow

After selecting a product variant and EMI plan:

1. User selects a product.
2. User selects a variant.
3. User selects an EMI plan.
4. User clicks **Proceed**.
5. A confirmation modal is displayed.
6. The selected product and EMI details are shown.
7. User confirms the selection.
8. A success state is displayed.

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
* Confirmation modal
* Smooth hover and transition effects

---

## Products

The database currently contains four products, with three variants for each:

| Product                  | Slug                 | Variants |
| ------------------------ | -------------------- | -------: |
| Apple iPhone 17 Pro      | `iphone-17-pro`      |        3 |
| Samsung Galaxy S24 Ultra | `samsung-s24-ultra`  |        3 |
| Google Pixel 9 Pro       | `google-pixel-9-pro` |        3 |
| OnePlus 13               | `oneplus-13`         |        3 |

All variants are stored in PostgreSQL and include their own color, storage, image, price, and stock information.

---

# Tech Stack

## Frontend

* React 19
* Vite
* Tailwind CSS
* React Router
* JavaScript / JSX

## Backend

* Node.js
* Express.js
* REST APIs
* CORS

## Database

* PostgreSQL
* Prisma ORM

## Deployment & Tools

* Git
* GitHub
* Render
* Postman / REST API testing

---

# Architecture

```text
                   User / Browser
                         │
                         ▼
                ┌─────────────────┐
                │ React + Vite    │
                │   Frontend      │
                └────────┬────────┘
                         │
                      REST API
                         │
                         ▼
                ┌─────────────────┐
                │    Express.js   │
                │     Backend     │
                └────────┬────────┘
                         │
                       Prisma
                         │
                         ▼
                ┌─────────────────┐
                │   PostgreSQL    │
                │                 │
                │ Products        │
                │ Variants        │
                │ EMI Plans       │
                └─────────────────┘
```

The frontend never connects directly to PostgreSQL.

All catalog and EMI information is requested through the Express backend API.

---

# Project Structure

```text
1fi-assignment/
│
├── frontend/
│   ├── public/
│   │   └── products/
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
├── package.json
└── README.md
```

---

# Database Schema

The application uses three main models.

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

Unique constraint:

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
| `monthlyPayment` | Decimal | Stored EMI value           |
| `cashback`       | Decimal | Cashback amount            |
| `isActive`       | Boolean | Whether the plan is active |

Unique constraint:

```text
(productId, tenureMonths)
```

---

# Database Relationships

```text
Product
   │
   ├───────────────┐
   │               │
   ▼               ▼
Variant          EmiPlan

Product 1 ──── N Variant
Product 1 ──── N EmiPlan
```

Both related models use cascading deletes.

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
      "imageUrl": "/products/iphone-17-pro-natural-titanium.png"
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

---

## Get Product Variants

```http
GET /api/products/:id/variants
```

Returns all variants belonging to a product.

---

## Get EMI Plans

```http
GET /api/products/:id/emi-plans
```

Returns all active EMI plans belonging to a product.

---

## Health Check

```http
GET /health
```

Example response:

```json
{
  "success": true,
  "message": "API is healthy"
}
```

---

# Error Handling

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

## 1. Clone Repository

```bash
git clone https://github.com/sriharikante/1fi-assignment.git
cd 1fi-assignment
```

## 2. Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env` and add your PostgreSQL connection string.

Generate Prisma Client:

```bash
npm run prisma:generate
```

Apply migrations:

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

Backend:

```text
http://localhost:4000
```

Test the API:

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

Create `frontend/.env`:

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

From the project root:

```bash
npm run build
```

The frontend production build is generated in:

```text
frontend/dist
```

The Express backend serves the production frontend and API from the same Render service.

---

# Production Deployment

The current application is deployed on **Render** as a single Web Service.

```text
Browser
   │
   ▼
Render Web Service
   │
   ├── React Frontend
   │
   └── Express REST API
            │
            ▼
       PostgreSQL
```

### Production URLs

```text
Application:
https://onefi-mobiles.onrender.com

API:
https://onefi-mobiles.onrender.com/api/products

Health:
https://onefi-mobiles.onrender.com/health
```

### Render Build Command

```bash
npm install && npm run build
```

### Render Start Command

```bash
npm start
```

The root `package.json` handles the frontend build and Prisma Client generation.

The Express server then serves:

```text
frontend/dist
```

and exposes the API through:

```text
/api
```

---

# GitHub Repository

Repository:

https://github.com/sriharikante/1fi-assignment

The repository contains:

* Frontend source code
* Backend source code
* Prisma schema
* Prisma migrations
* Seed data
* REST API implementation
* Product assets
* Environment examples
* README

Sensitive environment files and generated dependencies are excluded using `.gitignore`.

---

# Testing Checklist

* [x] Product catalog loads from backend API
* [x] PostgreSQL database connected
* [x] Prisma schema implemented
* [x] Seed data implemented
* [x] Four products available
* [x] Multiple variants per product
* [x] Unique product URLs
* [x] Product image changes with variant
* [x] Product price changes with variant
* [x] EMI plans load dynamically
* [x] EMI amount changes according to selected variant price
* [x] EMI plan selection works
* [x] Proceed button requires EMI selection
* [x] Confirmation flow works
* [x] Loading states implemented
* [x] Error states implemented
* [x] Product-not-found page implemented
* [x] Responsive UI
* [x] Production deployment
* [x] Live demo URL added
* [x] Demo video added

---

# Future Improvements

Possible improvements for a production-ready marketplace:

* User authentication
* Customer EMI order history
* Search and filtering
* Pagination
* Real payment gateway integration
* Admin product management
* Automated frontend and API tests
* Cloud image storage
* Order management
* EMI eligibility checks
* Production monitoring and logging

---

# Assignment Deliverables

### GitHub Repository

https://github.com/sriharikante/1fi-assignment

### Deployed Demo

https://onefi-mobiles.onrender.com

### Demo Video

*Add Google Drive or YouTube link here.*

The demo should showcase:

1. Product listing
2. Product details
3. Variant selection
4. Price and EMI changes
5. EMI plan selection
6. Confirmation flow
7. Backend API
8. PostgreSQL database
9. Overall application functionality

---

## Author

**Srihari Kante**

Built as part of the **1Fi SDE-1 Full-Stack Assignment**.
