# Product Browsing Backend

Backend API for browsing approximately 200,000 products using efficient cursor-based pagination.

Built as part of the CodeVector Backend Assignment to demonstrate scalable pagination, filtering, and handling large datasets.

---

## Tech Stack

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose

---

## Features

* Cursor-based pagination
* Category filtering
* Product CRUD operations
* Batched dataset generation (200,000 products)
* MongoDB indexing
* CORS support
* Health check endpoint
* Protection against accidental reseeding

---

## Setup

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
PORT=8080
MONGO_URI=mongodb://localhost:27017/products-browser
CLIENT_URI=http://localhost:5173
```

### Seed Database

```bash
npm run seed
```

Generates approximately 200,000 products using batched `insertMany()` operations.

### Start Development Server

```bash
npm run dev
```

### Build Project

```bash
npm run build
```

### Start Production Build

```bash
npm start
```

---

## API Endpoints

### Get Products

```http
GET /api/products
```

Returns products ordered by:

```ts
createdAt DESC
_id DESC
```

#### Query Parameters

| Parameter | Type   | Default | Description                            |
| --------- | ------ | ------- | -------------------------------------- |
| limit     | number | 20      | Products per page (max 100)            |
| category  | string | -       | Filter products by category            |
| cursor    | string | -       | Cursor returned from previous response |

#### Example

```http
GET /api/products?limit=20&category=Electronics
```

#### Response

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

#### Request Body

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

#### Request Body

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

Deletes the specified product.

---

### Product Statistics

```http
GET /api/products/stats
```

#### Response

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

Populates the database using batched inserts.

If products already exist, the endpoint returns:

```json
{
  "success": false,
  "message": "Database already seeded"
}
```

to prevent accidental duplicate dataset creation.

---

### Health Check

```http
GET /health
```

#### Response

```json
{
  "status": "ok"
}
```

---

## Product Schema

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

## Seeded Categories

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

## Pagination Design

Products are sorted using:

```ts
{
  createdAt: -1,
  _id: -1
}
```

Cursor payload:

```ts
{
  createdAt,
  id
}
```

The cursor is encoded as Base64 and returned as:

```json
{
  "pagination": {
    "nextCursor": "eyJ..."
  }
}
```

Subsequent requests provide this cursor:

```http
GET /api/products?cursor=eyJ...
```

This avoids the performance problems of:

```ts
skip(page * limit)
```

and keeps pagination performance consistent even with large datasets.

---

## MongoDB Indexes

The API is optimized using indexes on pagination fields.

Recommended index:

```ts
{
  category: 1,
  createdAt: -1,
  _id: -1
}
```

This allows MongoDB to efficiently support filtering and cursor-based pagination.

---

## Improvements With More Time

* JWT authentication
* Role-based access control
* Rate limiting
* Redis caching
* Automated testing
* Docker support
* Swagger/OpenAPI documentation
* Snapshot pagination for update consistency

---

## Author

Prashant Malviya
