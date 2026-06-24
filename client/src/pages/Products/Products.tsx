import { type FormEvent, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiAlertCircle, FiBox, FiRefreshCw, FiPlus, FiX } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { CategoryFilter } from '@/components/CategoryFilter'
import { SearchBar } from '@/components/SearchBar'
import { ProductCard } from '@/components/ProductCard'
import { ProductGridSkeleton } from '@/components/LoadingSkeleton'
import { EmptyState } from '@/components/EmptyState'
import { Pagination } from '@/components/Pagination'
import { createProduct, getApiErrorMessage } from '@/services'
import { CATEGORIES } from '@/constants'
import { useProducts, useDebounce } from '@/hooks'
import type { Category } from '@/types'

export function Products() {
  const [category, setCategory] = useState<Category | null>(null)
  const [searchInput, setSearchInput] = useState('')
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [formError, setFormError] = useState<string | null>(null)
  const [productForm, setProductForm] = useState({
    name: '',
    category: '' as Category | '',
    price: '',
  })

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
  } = useProducts({ category, search: debouncedSearch, refreshKey })

  function handleCategoryChange(next: Category | null) {
    setCategory(next)
    setSearchInput('')
  }

  async function handleCreateSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    const name = productForm.name.trim()
    const categoryValue = productForm.category
    const priceValue = Number(productForm.price)

    if (!name || !categoryValue || productForm.price.trim() === '') {
      setFormError('Please complete all fields before adding a product.')
      return
    }

    if (Number.isNaN(priceValue) || priceValue < 0) {
      setFormError('Enter a valid price greater than or equal to 0.')
      return
    }

    try {
      setIsSubmitting(true)
      await createProduct({ name, category: categoryValue, price: priceValue })
      toast.success('Product added successfully.')
      setProductForm({ name: '', category: '' as Category | '', price: '' })
      setIsCreateOpen(false)
      setRefreshKey((previous) => previous + 1)
    } catch (error) {
      toast.error(getApiErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
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
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
          <CategoryFilter value={category} onChange={handleCategoryChange} />
          <SearchBar value={searchInput} onChange={setSearchInput} />
        </div>
        <button
          type="button"
          onClick={() => setIsCreateOpen((previous) => !previous)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
        >
          <FiPlus /> Add product
        </button>
      </div>

      {isCreateOpen && (
        <div className="mt-6 rounded-2xl border border-ink-100 bg-white p-6 shadow-soft transition-shadow dark:border-ink-800 dark:bg-ink-900">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-ink-900 dark:text-white">Add a new product</h2>
              <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
                Create a product with a name, category, and price so it appears at the top of the product list.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsCreateOpen(false)}
              className="inline-flex h-10 items-center justify-center rounded-xl border border-ink-200 bg-white px-4 text-sm text-ink-600 transition-colors hover:bg-ink-50 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200 dark:hover:bg-ink-800"
            >
              <FiX className="text-base" /> Close
            </button>
          </div>

          <form onSubmit={handleCreateSubmit} className="mt-6 grid gap-4 sm:grid-cols-3">
            <label className="sm:col-span-2">
              <span className="text-sm font-medium text-ink-700 dark:text-ink-200">Product name</span>
              <input
                value={productForm.name}
                onChange={(event) => setProductForm((previous) => ({ ...previous, name: event.target.value }))}
                placeholder="Wireless mouse"
                className="mt-2 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-700 shadow-soft transition-colors placeholder:text-ink-400 focus:border-indigo-400 focus:outline-none dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200 dark:placeholder:text-ink-500"
              />
            </label>

            <label>
              <span className="text-sm font-medium text-ink-700 dark:text-ink-200">Category</span>
              <select
                value={productForm.category}
                onChange={(event) => setProductForm((previous) => ({
                  ...previous,
                  category: event.target.value as Category,
                }))}
                className="mt-2 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-700 shadow-soft transition-colors focus:border-indigo-400 focus:outline-none dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200"
              >
                <option value="">Choose category</option>
                {CATEGORIES.map((categoryItem) => (
                  <option key={categoryItem} value={categoryItem}>
                    {categoryItem}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span className="text-sm font-medium text-ink-700 dark:text-ink-200">Price</span>
              <div className="mt-2 flex items-center rounded-xl border border-ink-200 bg-white pr-3 shadow-soft focus-within:border-indigo-400 dark:border-ink-700 dark:bg-ink-900">
                <span className="px-3 text-sm text-ink-500 dark:text-ink-400">$</span>
                <input
                  value={productForm.price}
                  onChange={(event) => setProductForm((previous) => ({ ...previous, price: event.target.value }))}
                  placeholder="29.99"
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full rounded-r-xl border-none bg-transparent px-1 py-3 text-sm text-ink-700 outline-none placeholder:text-ink-400 dark:text-ink-200 dark:placeholder:text-ink-500"
                />
              </div>
            </label>

            <div className="sm:col-span-3">
              {formError && <p className="text-sm text-rose-600 dark:text-rose-400">{formError}</p>}
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateOpen(false)
                    setFormError(null)
                  }}
                  className="inline-flex items-center justify-center rounded-xl border border-ink-200 bg-white px-5 py-3 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-50 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200 dark:hover:bg-ink-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? 'Saving…' : 'Save product'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

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
