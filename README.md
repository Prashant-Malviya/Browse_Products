# Browse Products

A full-stack product browsing application built with React, TypeScript, Express, MongoDB, and Cursor Pagination.

The project demonstrates how to efficiently browse and filter a large dataset (~200,000 products) while maintaining fast pagination performance and avoiding the drawbacks of traditional offset-based pagination.

---

## Features

### Backend

* Cursor-based pagination using `createdAt` and `_id`
* Category filtering
* MongoDB + Mongoose
* Fast pagination without `skip()`
* Product CRUD APIs
* Batched dataset generation (200,000 products)
* CORS configuration
* Seed protection to prevent accidental reseeding

### Frontend

* React + TypeScript + Vite
* Product browsing UI
* Category filtering
* Cursor pagination navigation
* API documentation page
* Dark mode support

---

## Why Cursor Pagination?

Traditional offset pagination:

```text
?page=5000&limit=20
```

requires MongoDB to scan and discard thousands of documents before returning results.

This project uses cursor pagination:

```text
GET /api/products?cursor=<token>
```

Benefits:

* Constant query performance regardless of page depth
* No expensive `skip()` operations
* Handles concurrent inserts safely
* Suitable for large datasets

The cursor is generated from:

```ts
{
  createdAt,
  _id
}
```

and encoded as a Base64 token.

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS

### Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose

---

## Project Structure

```text
Browse_Products/
│
├── client/
│   ├── src/
│   ├── public/
│   └── README.md
│
├── server/
│   ├── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── README.md
│
└── README.md
```

---

## Backend Setup

```bash
cd server

npm install
```

Create `.env`

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
CLIENT_URI=http://localhost:5173
```

Run development server:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Start production build:

```bash
npm start
```

---

## Frontend Setup

```bash
cd client

npm install
```

Create `.env`

```env
VITE_API_BASE_URL=http://localhost:8080
```

Run:

```bash
npm run dev
```

---

## API Endpoints

### Get Products

```http
GET /api/products
```

Query Parameters:

| Parameter | Type   | Description                 |
| --------- | ------ | --------------------------- |
| limit     | number | Number of records (max 100) |
| category  | string | Product category filter     |
| cursor    | string | Pagination cursor           |

Example:

```http
GET /api/products?category=Electronics&limit=20
```

Response:

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "nextCursor": "eyJ...",
    "hasMore": true,
    "limit": 20
  }
}
```

---

### Create Product

```http
POST /api/products
```

```json
{
  "name": "Wireless Mouse",
  "category": "Electronics",
  "price": 24.99
}
```

---

### Update Product

```http
PUT /api/products/:id
```

```json
{
  "name": "Gaming Mouse",
  "price": 39.99
}
```

---

### Delete Product

```http
DELETE /api/products/:id
```

---

### Product Statistics

```http
GET /api/products/stats
```

Response:

```json
{
  "success": true,
  "data": {
    "totalProducts": 200000
  }
}
```

---

### Seed Dataset

```http
POST /api/seed
```

Generates approximately 200,000 products using batched `insertMany()` operations.

To prevent accidental duplication, reseeding is blocked when products already exist.

---

## Data Model

```ts
{
  _id: ObjectId,
  name: string,
  category: string,
  price: number,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Categories

* Electronics
* Clothing
* Books
* Home & Garden
* Sports
* Toys
* Automotive
* Health & Beauty
* Food & Grocery
* Office Supplies

---

## Improvements With More Time

* JWT Authentication for mutation endpoints
* Rate limiting for seed endpoint
* Redis caching
* Automated testing
* Docker support
* Snapshot pagination for update consistency
* API documentation using Swagger/OpenAPI

---

## Author

Prashant Malviya
