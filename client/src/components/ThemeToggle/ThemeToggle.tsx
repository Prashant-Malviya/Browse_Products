import { FiMoon, FiSun } from 'react-icons/fi'
import { useDarkMode } from '@/hooks'

export function ThemeToggle() {
  const [isDark, toggle] = useDarkMode()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 text-ink-600 transition-colors hover:bg-ink-50 dark:border-ink-700 dark:text-ink-300 dark:hover:bg-ink-800"
    >
      {isDark ? <FiSun /> : <FiMoon />}
    </button>
  )
}
