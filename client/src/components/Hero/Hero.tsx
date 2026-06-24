import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiBookOpen } from 'react-icons/fi'
import { PaginationDiagram } from '@/components/PaginationDiagram'

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-ink-100 dark:border-ink-800">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-emerald-50 dark:from-indigo-500/10 dark:via-ink-950 dark:to-emerald-500/10"
      />
      <div
        aria-hidden="true"
        className="absolute -top-24 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-300/30 to-emerald-300/30 blur-3xl dark:from-indigo-500/20 dark:to-emerald-500/20"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-28 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 font-mono text-xs font-medium text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300">
            Node.js · Express · MongoDB · TypeScript
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl dark:text-white">
            Scalable Product Browser Backend
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600 dark:text-ink-300">
            Production-ready backend built using Node.js, Express, MongoDB, and cursor pagination, capable of
            efficiently browsing 200,000+ products.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/products"
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-indigo-700"
            >
              Browse Products <FiArrowRight />
            </Link>
            <Link
              to="/api"
              className="flex items-center gap-2 rounded-xl border border-ink-200 bg-white px-5 py-3 text-sm font-semibold text-ink-700 shadow-soft transition-colors hover:bg-ink-50 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200 dark:hover:bg-ink-800"
            >
              <FiBookOpen /> API Documentation
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-ink-100 bg-white/90 p-6 shadow-soft-lg backdrop-blur dark:border-ink-800 dark:bg-ink-900/90"
        >
          <p className="font-mono text-xs uppercase tracking-wide text-ink-400 dark:text-ink-500">
            Why pagination here is different
          </p>
          <div className="mt-5">
            <PaginationDiagram />
          </div>
          <p className="mt-5 text-sm text-ink-500 dark:text-ink-400">
            Every page seeks from <code className="font-mono text-xs">{'{ createdAt, _id }'}</code> instead of counting
            through skipped rows — so page 10,000 costs the same as page 1.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
