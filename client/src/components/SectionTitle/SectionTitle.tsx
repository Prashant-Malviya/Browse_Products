import { motion } from 'framer-motion'
import { cn } from '@/utils'

interface SectionTitleProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionTitle({ eyebrow, title, description, align = 'left', className }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}
    >
      {eyebrow && (
        <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl dark:text-white">
        {title}
      </h2>
      {description && <p className="mt-3 text-base leading-relaxed text-ink-500 dark:text-ink-400">{description}</p>}
    </motion.div>
  )
}
