/**
 * The backend README documents a single resource: `GET /api/products`.
 * The stats and seed endpoints below are NOT part of the documented
 * backend contract — they're included so the "Generate Dataset" UI
 * (driven by the frontend brief) degrades gracefully instead of
 * silently failing if/when those routes are added. See the API page
 * for a runtime note about this gap.
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000'

export const ENDPOINTS = {
  products: '/api/products',
  productStats: '/api/products/stats',
  seed: '/api/seed',
} as const

export const DEFAULT_PAGE_LIMIT = 20
export const MAX_PAGE_LIMIT = 100
export const SEED_DATASET_TARGET = 200_000
export const SEED_BATCH_SIZE = 2_000
