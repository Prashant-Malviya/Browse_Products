import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface EmptyStateProps {
  icon: ReactNode
  title: string
  message: string
  action?: ReactNode
}

export function EmptyState({ icon, title, message, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-200 bg-white px-6 py-16 text-center dark:border-ink-800 dark:bg-ink-900"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ink-50 text-2xl text-ink-400 dark:bg-ink-800 dark:text-ink-500">
        {icon}
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold text-ink-800 dark:text-ink-100">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-ink-500 dark:text-ink-400">{message}</p>
      {action && <div className="mt-5">{action}</div>}
    </motion.div>
  )
}
