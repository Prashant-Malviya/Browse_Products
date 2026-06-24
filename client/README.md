# Product Browser — Frontend

A React + TypeScript + Vite frontend for the cursor-paginated Product Browser backend (Node.js, Express, MongoDB).

## Stack

React 19 · TypeScript · Vite · React Router · Axios · Tailwind CSS v4 · Framer Motion · React Icons · React Hot Toast

## Setup

```bash
npm install
cp .env.example .env   # set VITE_API_BASE_URL to your running backend
npm run dev
```

| Script             | Purpose                                |
| ------------------ | --------------------------------------- |
| `npm run dev`       | Start the dev server with HMR           |
| `npm run build`     | Type-check, then build to `dist/`       |
| `npm run preview`   | Preview the production build locally    |
| `npm run lint`      | Run ESLint                              |
| `npm run format`    | Format `src/` with Prettier             |

## Important: backend contract gap

The backend README documents exactly one route: **`GET /api/products`**. This frontend's brief also called for a
"Generate Dataset" flow on the Home page, which needs a product-count endpoint and a way to trigger seeding —
so this app additionally calls:

- `GET /api/products/stats` — total product count
- `POST /api/seed` — triggers the batched seed script

**Neither of those two is in the documented backend contract.** They're implemented here so the intended UI flow
exists end-to-end, but until those routes are added server-side, the Home page's stats card and "Generate" button
will surface a clear error toast instead of failing silently. This gap is also called out directly on the **API
page** inside the app, and in `src/constants/api.ts`.

## Project structure

```text
src/
  components/   Reusable UI pieces (one folder per component)
  pages/        Route-level views: Home, Products, Api, About, Contact
  hooks/        useCursorPagination, useProducts, useDebounce, useDarkMode, useDatasetStats
  services/     Axios instance + product API calls
  types/        Product, pagination, and API response types
  constants/    Categories, endpoints, pagination/seed config
  utils/        Formatting, classnames, clipboard helpers
  routes/       Lazy-loaded route table
```

## Cursor pagination, from the frontend's side

`useCursorPagination` caches every page it has fetched in memory, keyed by index. **Next** asks the backend for
one more page using the previous page's `nextCursor`; **Previous** simply moves the pointer back to an
already-cached page, with no extra request. Changing the category filter resets pagination to page one via a
`resetKey`. There's no search endpoint on the backend yet, so the search box filters only the products already
loaded on the current page — clearly labeled in the UI rather than implied as full-dataset search.

## Environment variables

| Variable              | Default                  | Purpose                  |
| ---------------------- | ------------------------- | ------------------------- |
| `VITE_API_BASE_URL`     | `http://localhost:5000`   | Base URL of the backend   |
