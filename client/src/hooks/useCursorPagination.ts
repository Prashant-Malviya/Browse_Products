import { useCallback, useEffect, useRef, useState } from 'react'
import type { Pagination } from '@/types'

interface FetchPageResult<T> {
  data: T[]
  pagination: Pagination
}

interface Page<T> {
  cursorUsed: string | null
  items: T[]
  pagination: Pagination
}

interface UseCursorPaginationArgs<T> {
  /** Fetches one page given the cursor to seek from (null = first page). */
  fetchPage: (cursor: string | null) => Promise<FetchPageResult<T>>
  /**
   * Any value that should reset pagination back to page 1 when it changes
   * (e.g. a serialized `${category}:${search}` key).
   */
  resetKey: string
}

interface UseCursorPaginationResult<T> {
  items: T[]
  isLoading: boolean
  isError: boolean
  errorMessage: string | null
  hasMore: boolean
  hasPrevious: boolean
  pageNumber: number
  limit: number
  goNext: () => void
  goPrevious: () => void
  retry: () => void
}

/**
 * Cursor-based pagination, mirroring the backend's seek-pagination contract:
 * each page is fetched with the previous page's `nextCursor`. Visited pages
 * are cached in memory, so navigating Back never re-hits the network and
 * never shifts if new items are inserted ahead of the cursor.
 */
export function useCursorPagination<T>({
  fetchPage,
  resetKey,
}: UseCursorPaginationArgs<T>): UseCursorPaginationResult<T> {
  const [pages, setPages] = useState<Page<T>[]>([])
  const [pageIndex, setPageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const fetchPageRef = useRef(fetchPage)
  useEffect(() => {
    fetchPageRef.current = fetchPage
  })

  const loadPage = useCallback(async (cursor: string | null, targetIndex: number) => {
    setIsLoading(true)
    setErrorMessage(null)
    try {
      const result = await fetchPageRef.current(cursor)
      setPages((previous) => {
        const next = previous.slice(0, targetIndex)
        next[targetIndex] = { cursorUsed: cursor, items: result.data, pagination: result.pagination }
        return next
      })
      setPageIndex(targetIndex)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to load products.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Reset to page 1 whenever the filter/search identity changes.
  useEffect(() => {
    void loadPage(null, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey])

  const currentPage = pages[pageIndex]

  const goNext = useCallback(() => {
    const cached = pages[pageIndex + 1]
    if (cached) {
      setPageIndex(pageIndex + 1)
      return
    }
    if (currentPage?.pagination.hasMore) {
      void loadPage(currentPage.pagination.nextCursor, pageIndex + 1)
    }
  }, [pages, pageIndex, currentPage, loadPage])

  const goPrevious = useCallback(() => {
    if (pageIndex > 0) setPageIndex(pageIndex - 1)
  }, [pageIndex])

  const retry = useCallback(() => {
    void loadPage(currentPage?.cursorUsed ?? null, pageIndex)
  }, [loadPage, currentPage, pageIndex])

  return {
    items: currentPage?.items ?? [],
    isLoading,
    isError: errorMessage !== null,
    errorMessage,
    hasMore: currentPage?.pagination.hasMore ?? false,
    hasPrevious: pageIndex > 0,
    pageNumber: pageIndex + 1,
    limit: currentPage?.pagination.limit ?? 20,
    goNext,
    goPrevious,
    retry,
  }
}
