import { motion } from 'framer-motion'
import { cn } from '@/utils'

interface StatCardProps {
  label: string
  value: string
  hint?: string
  accent?: 'indigo' | 'emerald'
  className?: string
}

export function StatCard({ label, value, hint, accent = 'indigo', className }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={cn(
        'rounded-2xl border border-ink-100 bg-white p-5 shadow-soft dark:border-ink-800 dark:bg-ink-900',
        className,
      )}
    >
      <p className="font-mono text-xs uppercase tracking-wide text-ink-400 dark:text-ink-500">{label}</p>
      <p
        className={cn(
          'mt-2 font-display text-3xl font-bold tracking-tight',
          accent === 'indigo' ? 'text-indigo-600 dark:text-indigo-400' : 'text-emerald-600 dark:text-emerald-400',
        )}
      >
        {value}
      </p>
      {hint && <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{hint}</p>}
    </motion.div>
  )
}
