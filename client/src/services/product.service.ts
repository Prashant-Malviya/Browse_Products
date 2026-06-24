import { apiClient } from './api'
import { ENDPOINTS } from '@/constants'
import type { Category, Product, ProductListResponse, SeedResponse, StatsResponse } from '@/types'

export interface GetProductsParams {
  limit?: number
  category?: Category | null
  cursor?: string | null
}

export interface CreateProductPayload {
  name: string
  category: Category
  price: number
}

export interface CreateProductResponse {
  success: boolean
  data: Product
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

export async function createProduct(product: CreateProductPayload): Promise<CreateProductResponse> {
  const { data } = await apiClient.post<CreateProductResponse>(ENDPOINTS.products, product)
  return data
}

/** Same caveat as getProductStats — not in the documented backend contract. */
export async function seedProducts(): Promise<SeedResponse> {
  const { data } = await apiClient.post<SeedResponse>(ENDPOINTS.seed, undefined, {
    timeout: 120_000,
  })
  return data
}
