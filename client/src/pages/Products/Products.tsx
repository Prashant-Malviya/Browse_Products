import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiAlertCircle, FiBox, FiRefreshCw } from 'react-icons/fi'
import { CategoryFilter } from '@/components/CategoryFilter'
import { SearchBar } from '@/components/SearchBar'
import { ProductCard } from '@/components/ProductCard'
import { ProductGridSkeleton } from '@/components/LoadingSkeleton'
import { EmptyState } from '@/components/EmptyState'
import { Pagination } from '@/components/Pagination'
import { useProducts, useDebounce } from '@/hooks'
import type { Category } from '@/types'

export function Products() {
  const [category, setCategory] = useState<Category | null>(null)
  const [searchInput, setSearchInput] = useState('')
  const debouncedSearch = useDebounce(searchInput, 300)

  const {
    products,
    isLoading,
    isError,
    errorMessage,
    hasMore,
    hasPrevious,
    pageNumber,
    loadedOnPage,
    isSearchFiltered,
    goNext,
    goPrevious,
    retry,
  } = useProducts({ category, search: debouncedSearch })

  function handleCategoryChange(next: Category | null) {
    setCategory(next)
    setSearchInput('')
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
          Browse
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-900 dark:text-white">Products</h1>
        <p className="mt-3 text-base text-ink-500 dark:text-ink-400">
          Paged with the same seek-based cursor the backend uses internally — Next requests the last visible document's
          position, never an offset.
        </p>
      </div>

      <div className="sticky top-[65px] z-30 -mx-4 mt-8 flex flex-col gap-3 border-b border-ink-100 bg-ink-50/95 px-4 py-4 backdrop-blur sm:mx-0 sm:flex-row sm:items-center sm:justify-between sm:rounded-2xl sm:border sm:px-5 dark:border-ink-800 dark:bg-ink-950/95">
        <CategoryFilter value={category} onChange={handleCategoryChange} />
        <SearchBar value={searchInput} onChange={setSearchInput} />
      </div>

      {isSearchFiltered && !isLoading && (
        <p className="mt-4 text-xs text-ink-400 dark:text-ink-500">
          Filtering the {loadedOnPage} products already loaded on this page — the backend doesn't expose a search
          endpoint yet, so this only narrows what's currently visible.
        </p>
      )}

      <div className="mt-6">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div key="loading" exit={{ opacity: 0 }}>
              <ProductGridSkeleton />
            </motion.div>
          ) : isError ? (
            <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <EmptyState
                icon={<FiAlertCircle />}
                title="Couldn't load products"
                message={errorMessage ?? 'Something went wrong while contacting the backend.'}
                action={
                  <button
                    type="button"
                    onClick={retry}
                    className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
                  >
                    <FiRefreshCw /> Retry
                  </button>
                }
              />
            </motion.div>
          ) : products.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <EmptyState
                icon={<FiBox />}
                title="No products found"
                message={
                  isSearchFiltered
                    ? 'Nothing on this page matches that search. Try clearing it or moving to the next page.'
                    : 'Try a different category, or generate the dataset from the Home page.'
                }
              />
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!isError && (
        <div className="mt-10">
          <Pagination
            loadedCount={loadedOnPage}
            hasPrevious={hasPrevious}
            hasMore={hasMore}
            pageNumber={pageNumber}
            isLoading={isLoading}
            onPrevious={goPrevious}
            onNext={goNext}
          />
        </div>
      )}
    </div>
  )
}
