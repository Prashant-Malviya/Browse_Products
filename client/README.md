# Product Browser — Frontend

A React + TypeScript + Vite frontend for the cursor-paginated Product Browser backend.

## Stack

React 19 · TypeScript · Vite · React Router · Axios · Tailwind CSS v4 · Framer Motion · React Icons · React Hot Toast

## Setup

```bash
npm install
cp .env.example .env
# set VITE_API_BASE_URL to your running backend, e.g. http://localhost:8080
npm run dev
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server with HMR |
| `npm run build` | Type-check and build the production bundle |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format source files with Prettier |

## API usage

The frontend consumes these backend endpoints:

- `GET /api/products`
- `GET /api/products/stats`
- `POST /api/seed`

The `Products` page uses cursor pagination via `useCursorPagination`.
The `Home` page uses `/api/products/stats` to display dataset size and `/api/seed` to generate products.

## Project structure

```text
src/
  components/   Reusable UI components
  pages/        Route-level views: Home, Products, Api, About, Contact
  hooks/        Data fetching and pagination hooks
  services/     Axios client and product API calls
  types/        Product, category, and API response types
  constants/    API endpoints, categories, and pagination settings
  utils/        Formatting, clipboard, and helper utilities
  routes/       Lazy-loaded route definitions
```

## Behavior notes

- Category filtering is server-backed and resets pagination.
- Search is client-side only and filters products already loaded on the current page.
- Previously fetched pages are cached in memory so navigating back does not re-request them.

## Environment variables

| Variable | Example | Purpose |
| --- | --- | --- |
| `VITE_API_BASE_URL` | `http://localhost:8080` | Backend base URL |
