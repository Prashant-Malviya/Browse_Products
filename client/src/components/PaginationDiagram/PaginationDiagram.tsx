import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface PaginationDiagramProps {
  /** Compact renders fewer ticks and tighter spacing — used inside the hero. */
  compact?: boolean
}

const TICK_COUNT = 20
const CHUNK_WIDTH = 100 / 5 // 5 chunks across the track

export function PaginationDiagram({ compact = false }: PaginationDiagramProps) {
  return (
    <div className={compact ? 'space-y-4' : 'space-y-6'}>
      <Track
        label="Offset · skip()"
        sublabel="Re-scans from document zero — work grows with every page"
        tone="amber"
        compact={compact}
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-amber-400/40 dark:bg-amber-400/25"
          animate={{ width: ['20%', '20%', '40%', '40%', '60%', '60%', '80%', '80%', '100%', '100%', '20%'] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.06, 0.16, 0.22, 0.32, 0.38, 0.48, 0.54, 0.64, 0.7, 1],
          }}
        />
      </Track>

      <Track
        label="Cursor · seek()"
        sublabel="Jumps straight from the last _id — constant work, every page"
        tone="emerald"
        compact={compact}
      >
        <motion.div
          className="absolute inset-y-0 rounded-full bg-emerald-400/50 dark:bg-emerald-400/30"
          style={{ width: `${CHUNK_WIDTH}%` }}
          animate={{ left: ['0%', '0%', '20%', '20%', '40%', '40%', '60%', '60%', '80%', '80%', '0%'] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.06, 0.16, 0.22, 0.32, 0.38, 0.48, 0.54, 0.64, 0.7, 1],
          }}
        />
      </Track>
    </div>
  )
}

interface TrackProps {
  label: string
  sublabel: string
  tone: 'amber' | 'emerald'
  compact: boolean
  children: ReactNode
}

function Track({ label, sublabel, tone, compact, children }: TrackProps) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <span
          className={`font-mono text-xs font-semibold ${tone === 'amber' ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}
        >
          {label}
        </span>
        {!compact && <span className="text-right text-xs text-ink-400 dark:text-ink-500">{sublabel}</span>}
      </div>
      <div className="relative h-3 overflow-hidden rounded-full bg-ink-100 dark:bg-ink-800">
        {children}
        <div className="absolute inset-0 flex items-center justify-between px-0.5">
          {Array.from({ length: TICK_COUNT }).map((_, index) => (
            <span key={index} className="h-1 w-px bg-ink-300/70 dark:bg-ink-600/70" />
          ))}
        </div>
      </div>
      {compact && <p className="mt-1 text-xs text-ink-400 dark:text-ink-500">{sublabel}</p>}
    </div>
  )
}
