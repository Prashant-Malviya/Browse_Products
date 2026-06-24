import type { Category } from '@/types'

/**
 * Aligns client-supported categories with the backend's seeded product categories.
 */
export const CATEGORIES: Category[] = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Garden',
  'Sports',
  'Toys',
  'Automotive',
  'Health & Beauty',
  'Food & Grocery',
  'Office Supplies',
]

export const CATEGORY_META: Record<Category, { icon: string; accent: string }> = {
  Electronics: { icon: '💻', accent: 'indigo' },
  Clothing: { icon: '👕', accent: 'emerald' },
  Books: { icon: '📚', accent: 'indigo' },
  'Home & Garden': { icon: '🛋️', accent: 'indigo' },
  Sports: { icon: '🏀', accent: 'emerald' },
  Toys: { icon: '🧸', accent: 'emerald' },
  Automotive: { icon: '🚗', accent: 'indigo' },
  'Health & Beauty': { icon: '💅', accent: 'emerald' },
  'Food & Grocery': { icon: '🥦', accent: 'indigo' },
  'Office Supplies': { icon: '📎', accent: 'emerald' },
}

export const ALL_CATEGORIES_VALUE = 'All' as const
