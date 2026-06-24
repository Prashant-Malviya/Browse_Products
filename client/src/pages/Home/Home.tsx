import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Hero } from '@/components/Hero'
import { SectionTitle } from '@/components/SectionTitle'
import { StatCard } from '@/components/StatCard'
import { StatCardSkeleton } from '@/components/LoadingSkeleton'
import { ConfirmationModal } from '@/components/ConfirmationModal'
import { useDatasetStats } from '@/hooks'
import { SEED_DATASET_TARGET, SEED_BATCH_SIZE } from '@/constants'
import { formatNumber } from '@/utils'
import { FiDatabase, FiLoader } from 'react-icons/fi'

const HIGHLIGHTS = [
  {
    emoji: '🚀',
    title: 'Cursor Pagination',
    description:
      'Seeks forward from a stable { createdAt, _id } position instead of skipping rows, so deep pages cost the same as page one.',
  },
  {
    emoji: '⚡',
    title: 'MongoDB Indexing',
    description:
      'Compound indexes match the sort and filter keys, so MongoDB walks the index directly — no in-memory sort, no full scan.',
  },
  {
    emoji: '📦',
    title: '200,000 Product Support',
    description: `Seeded in ${formatNumber(SEED_BATCH_SIZE)}-document batches via insertMany(), keeping seed-time memory flat regardless of dataset size.`,
  },
  {
    emoji: '🔍',
    title: 'Category Filtering',
    description:
      'A compound index puts the category equality predicate ahead of the sort keys, so filtered browsing stays index-backed too.',
  },
  {
    emoji: '📈',
    title: 'Scalable Queries',
    description:
      'Each page fetches only limit + 1 documents — just enough to know hasMore — never a full collection count.',
  },
  {
    emoji: '🏗',
    title: 'Clean Architecture',
    description:
      'Routes, controllers, services, and repositories stay separated, so validation, business logic, and queries change independently.',
  },
]

export function Home() {
  const { totalProducts, isLoadingStats, statsUnavailable, isSeeding, isAtTarget, runSeed } = useDatasetStats()
  const [confirmOpen, setConfirmOpen] = useState(false)

  async function handleGenerateClick() {
    if (isAtTarget) {
      setConfirmOpen(true)
      return
    }
    await triggerSeed()
  }

  async function triggerSeed() {
    setConfirmOpen(false)
    const result = await runSeed()
    if (result.ok) {
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
  }

  return (
    <div>
      <Hero />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Why this backend"
          title="Project Highlights"
          description="Six engineering decisions that let this API stay fast at 200,000+ documents."
        />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHTS.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft transition-shadow hover:shadow-soft-lg dark:border-ink-800 dark:bg-ink-900"
            >
              <span className="text-2xl">{item.emoji}</span>
              <h3 className="mt-3 font-display text-base font-semibold text-ink-900 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Test data"
          title="Generate Product Dataset"
          description="Products are generated using the backend's seed script, inserted in batches to keep memory flat."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-2xl border border-ink-100 bg-white p-8 shadow-soft dark:border-ink-800 dark:bg-ink-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              <FiDatabase className="text-xl" />
            </div>
            <p className="mt-4 text-base leading-relaxed text-ink-600 dark:text-ink-300">
              Generate approximately{' '}
              <strong className="text-ink-900 dark:text-white">{formatNumber(SEED_DATASET_TARGET)} products</strong>{' '}
              into MongoDB for testing high-performance pagination.
            </p>
            <button
              type="button"
              onClick={handleGenerateClick}
              disabled={isSeeding}
              className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSeeding ? (
                <>
                  <FiLoader className="animate-spin" /> Generating…
                </>
              ) : (
                `Generate ${formatNumber(SEED_DATASET_TARGET)} Products`
              )}
            </button>
            {statsUnavailable && (
              <p className="mt-3 text-xs text-amber-600 dark:text-amber-400">
                The stats/seed endpoints aren't part of the documented backend yet — this button will surface a clear
                error toast until they're added. See the API page for details.
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {isLoadingStats ? (
              <>
                <StatCardSkeleton />
                <StatCardSkeleton />
              </>
            ) : (
              <>
                <StatCard
                  label="Current Product Count"
                  value={statsUnavailable || totalProducts === null ? '—' : `${formatNumber(totalProducts)} Products`}
                  hint={isAtTarget ? 'Target reached' : `Target: ${formatNumber(SEED_DATASET_TARGET)}`}
                  accent="indigo"
                />
                <StatCard
                  label="Seed Batch Size"
                  value={`${formatNumber(SEED_BATCH_SIZE)}`}
                  hint="documents per insertMany() batch"
                  accent="emerald"
                />
              </>
            )}
          </div>
        </div>
      </section>

      <ConfirmationModal
        isOpen={confirmOpen}
        title="Database Already Contains 200,000 Products"
        message="Your database already contains approximately 200,000 products. Generating again will create duplicate/random products and increase database size. Do you still want to continue?"
        confirmLabel="Generate Anyway"
        cancelLabel="Cancel"
        isConfirming={isSeeding}
        onConfirm={triggerSeed}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  )
}
