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
# Edit .env and set your MONGO_URI
```

### 3. Seed the database
```bash
npm run seed
```
This inserts 200,000 fake products. Takes about 30–60 seconds.

### 4. Start the development server
```bash
npm run dev
```

## API

### GET /api/products

Returns a paginated list of products.

**Query Parameters:**

| Parameter | Type   | Default | Description                          |
|-----------|--------|---------|--------------------------------------|
| limit     | number | 20      | Products per page (max 100)          |
| category  | string | -       | Filter by category name              |
| cursor    | string | -       | Cursor from previous page response   |

**Example Requests:**
```
# First page, all products
GET /api/products

# First page, electronics only
GET /api/products?category=Electronics

# Next page (paste the nextCursor value from previous response)
GET /api/products?cursor=eyJjcmVhdGVkQXQiOi...

# 50 products per page
GET /api/products?limit=50

# Combined
GET /api/products?category=Books&limit=10
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": "Electronics Product 1",
      "category": "Electronics",
      "price": 299.99,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "nextCursor": "eyJjcmVhdGVkQXQiOi...",
    "hasMore": true,
    "limit": 20
  }
}
```

To get the next page, pass `nextCursor` as the `cursor` parameter.
When `hasMore` is `false`, you have reached the last page.

## Available Categories

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

## Health Check

```
GET /health
```
