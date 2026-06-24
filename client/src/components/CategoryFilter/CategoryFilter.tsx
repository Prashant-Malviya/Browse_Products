import { FiChevronDown } from 'react-icons/fi'
import { CATEGORIES, CATEGORY_META, ALL_CATEGORIES_VALUE } from '@/constants'
import type { Category } from '@/types'
import { cn } from '@/utils'

interface CategoryFilterProps {
  value: Category | null
  onChange: (category: Category | null) => void
  className?: string
}

/**
 * A real <select> dropdown (per the brief), styled to match the rest of the
 * UI. Changing the value is expected to reset pagination — handled by the
 * caller via useProducts' resetKey.
 */
export function CategoryFilter({ value, onChange, className }: CategoryFilterProps) {
  return (
    <div className={cn('relative inline-flex items-center', className)}>
      <span aria-hidden="true" className="pointer-events-none absolute left-3 text-base">
        {value ? CATEGORY_META[value].icon : '🗂️'}
      </span>
      <select
        aria-label="Filter by category"
        value={value ?? ALL_CATEGORIES_VALUE}
        onChange={(event) =>
          onChange(event.target.value === ALL_CATEGORIES_VALUE ? null : (event.target.value as Category))
        }
        className="w-full appearance-none rounded-xl border border-ink-200 bg-white py-2.5 pl-10 pr-9 text-sm font-medium text-ink-700 shadow-soft transition-colors hover:border-ink-300 focus:border-indigo-400 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200 dark:hover:border-ink-600"
      >
        <option value={ALL_CATEGORIES_VALUE}>All Categories</option>
        {CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <FiChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 text-ink-400" />
    </div>
  )
}
