import type { Category } from '@/types'

/**
 * Mirrors the exact category enum enforced by the backend's validation
 * middleware. Order matches the backend README so filter UI and any
 * copy referencing "supported categories" stay in sync with the API.
 */
export const CATEGORIES: Category[] = ['Electronics', 'Fashion', 'Home', 'Sports', 'Books', 'Toys']

export const CATEGORY_META: Record<Category, { icon: string; accent: string }> = {
  Electronics: { icon: '💻', accent: 'indigo' },
  Fashion: { icon: '👕', accent: 'emerald' },
  Home: { icon: '🛋️', accent: 'indigo' },
  Sports: { icon: '🏀', accent: 'emerald' },
  Books: { icon: '📚', accent: 'indigo' },
  Toys: { icon: '🧸', accent: 'emerald' },
}

export const ALL_CATEGORIES_VALUE = 'All' as const
