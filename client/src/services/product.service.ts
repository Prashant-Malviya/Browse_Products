import { apiClient } from './api'
import { ENDPOINTS } from '@/constants'
import type { Category, ProductListResponse, SeedResponse, StatsResponse } from '@/types'

export interface GetProductsParams {
  limit?: number
  category?: Category | null
  cursor?: string | null
}

export async function getProducts({ limit, category, cursor }: GetProductsParams): Promise<ProductListResponse> {
  const { data } = await apiClient.get<ProductListResponse>(ENDPOINTS.products, {
    params: {
      limit,
      category: category ?? undefined,
      cursor: cursor ?? undefined,
    },
  })
  return data
}

/**
 * Not part of the documented backend contract (see constants/api.ts).
 * Callers should catch and treat failure as "stats unavailable" rather
 * than a hard error.
 */
export async function getProductStats(): Promise<StatsResponse> {
  const { data } = await apiClient.get<StatsResponse>(ENDPOINTS.productStats)
  return data
}

/** Same caveat as getProductStats — not in the documented backend contract. */
export async function seedProducts(): Promise<SeedResponse> {
  const { data } = await apiClient.post<SeedResponse>(ENDPOINTS.seed, undefined, {
    timeout: 120_000,
  })
  return data
}
