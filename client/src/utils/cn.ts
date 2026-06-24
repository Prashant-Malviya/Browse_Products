export type ClassValue = string | number | boolean | null | undefined

/** Joins truthy class values together. A minimal stand-in for `clsx`. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ')
}
