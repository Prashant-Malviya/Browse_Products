import type { Product } from './product'

export interface Pagination {
  nextCursor: string | null
  hasMore: boolean
  limit: number
}

export interface ProductListResponse {
  success: boolean
  data: Product[]
  pagination: Pagination
}

export interface ApiErrorBody {
  success: false
  message: string
  errors?: Record<string, string>
}

export interface StatsResponse {
  success: boolean
  data: {
    totalProducts: number
  }
}

export interface SeedResponse {
  success: boolean
  message: string
  data?: {
    inserted: number
    totalProducts: number
  }
}
