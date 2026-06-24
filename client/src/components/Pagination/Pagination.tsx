import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

interface PaginationProps {
  loadedCount: number
  hasPrevious: boolean
  hasMore: boolean
  pageNumber: number
  isLoading: boolean
  onPrevious: () => void
  onNext: () => void
}

export function Pagination({
  loadedCount,
  hasPrevious,
  hasMore,
  pageNumber,
  isLoading,
  onPrevious,
  onNext,
}: PaginationProps) {
  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t border-ink-100 pt-6 sm:flex-row dark:border-ink-800">
      <div className="text-sm text-ink-500 dark:text-ink-400">
        Showing <span className="font-medium text-ink-800 dark:text-ink-200">{loadedCount}</span> products
        <span className="mx-2 text-ink-300 dark:text-ink-600">·</span>
        <span className="font-mono text-xs uppercase tracking-wide text-ink-400">Cursor-based pagination</span>
        <span className="mx-2 text-ink-300 dark:text-ink-600">·</span>
        Page {pageNumber}
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrevious}
          disabled={!hasPrevious || isLoading}
          className="flex items-center gap-1.5 rounded-lg border border-ink-200 px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-ink-700 dark:text-ink-200 dark:hover:bg-ink-800"
        >
          <FiArrowLeft /> Previous
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!hasMore || isLoading}
          className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next <FiArrowRight />
        </button>
      </div>
    </div>
  )
}
