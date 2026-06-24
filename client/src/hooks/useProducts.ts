import { useMemo } from 'react'
import { useCursorPagination } from './useCursorPagination'
import { getProducts } from '@/services'
import { DEFAULT_PAGE_LIMIT } from '@/constants'
import type { Category, Product } from '@/types'

interface UseProductsArgs {
  category: Category | null
  /** Client-side filter — the backend doesn't expose a search endpoint (see API page note). */
  search: string
  refreshKey?: number
}

export function useProducts({ category, search, refreshKey }: UseProductsArgs) {
  const pagination = useCursorPagination<Product>({
    resetKey: `${category ?? 'all'}:${refreshKey ?? 0}`,
    fetchPage: (cursor) => getProducts({ limit: DEFAULT_PAGE_LIMIT, category, cursor }),
  })

  const trimmedSearch = search.trim().toLowerCase()

  const products = useMemo(() => {
    if (!trimmedSearch) return pagination.items
    return pagination.items.filter((product) => product.name.toLowerCase().includes(trimmedSearch))
  }, [pagination.items, trimmedSearch])

  return {
    ...pagination,
    products,
    isSearchFiltered: trimmedSearch.length > 0,
    loadedOnPage: pagination.items.length,
  }
}
