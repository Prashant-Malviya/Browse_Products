# Product Browsing Backend

A backend API for browsing ~200,000 products with cursor-based pagination.

## Tech Stack

- Node.js + Express.js
- TypeScript
- MongoDB + Mongoose

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env and set your MONGO_URI and CLIENT_URI
```

### 3. Seed the database
```bash
npm run seed
```

This inserts ~200,000 products in batches and keeps memory usage low.

### 4. Start the development server
```bash
npm run dev
```

## API

### GET /api/products

Returns a paginated list of products.

**Query Parameters:**

| Parameter | Type   | Default | Description |
| --- | --- | --- | --- |
| `limit` | number | 20 | Products per page (max 100) |
| `category` | string | - | Filter by category name |
| `cursor` | string | - | Cursor from previous page response |

### GET /api/products/stats

Returns a count of products in the collection.

### POST /api/seed

Inserts the seed dataset into MongoDB using batched `insertMany` calls.

### GET /health

Basic health check endpoint.

## Example requests

```bash
curl "http://localhost:8080/api/products?limit=20&category=Electronics"
```

```bash
curl "http://localhost:8080/api/products/stats"
```

```bash
curl -X POST "http://localhost:8080/api/seed"
```

## Product categories

The backend seeds these categories:

- Electronics
- Clothing
- Books
- Home & Garden
- Sports
- Toys
- Automotive
- Health & Beauty
- Food & Grocery
- Office Supplies

## Environment variables

| Variable | Example | Purpose |
| --- | --- | --- |
| `PORT` | `8080` | Server port |
| `MONGO_URI` | `mongodb://localhost:27017/products-browser` | MongoDB connection URI |
| `CLIENT_URI` | `http://localhost:5173` | Allowed frontend origin for CORS |
