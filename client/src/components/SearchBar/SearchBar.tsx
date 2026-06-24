import { FiSearch, FiX } from 'react-icons/fi'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = 'Search products on this page…' }: SearchBarProps) {
  return (
    <div className="relative w-full sm:w-72">
      <FiSearch
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Search loaded products"
        className="w-full rounded-xl border border-ink-200 bg-white py-2.5 pl-10 pr-9 text-sm text-ink-700 shadow-soft placeholder:text-ink-400 focus:border-indigo-400 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200"
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onChange('')}
          className="absolute right-2.5 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full p-1 text-ink-400 hover:bg-ink-100 hover:text-ink-600 dark:hover:bg-ink-800"
        >
          <FiX />
        </button>
      )}
    </div>
  )
}
