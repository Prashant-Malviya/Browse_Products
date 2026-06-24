import { motion } from 'framer-motion'
import type { Product } from '@/types'
import { CATEGORY_META } from '@/constants'
import { formatDate, formatPrice, truncateId, copyToClipboard, cn } from '@/utils'
import { FiCopy } from 'react-icons/fi'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const meta = CATEGORY_META[product.category]
  const isEmerald = meta.accent === 'emerald'

  async function handleCopyId() {
    const ok = await copyToClipboard(product._id)
    if (ok) toast.success('Product ID copied')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group flex flex-col rounded-2xl border border-ink-100 bg-white p-5 shadow-soft transition-shadow hover:shadow-soft-lg dark:border-ink-800 dark:bg-ink-900"
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            'flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium',
            isEmerald
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'
              : 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300',
          )}
        >
          <span aria-hidden="true">{meta.icon}</span>
          {product.category}
        </span>
        <span className="font-mono text-xs text-ink-400">{formatDate(product.createdAt)}</span>
      </div>

      <h3 className="mt-4 line-clamp-2 font-display text-base font-semibold text-ink-900 dark:text-white">
        {product.name}
      </h3>

      <div className="mt-5 flex items-center justify-between">
        <span className="font-display text-xl font-bold text-ink-900 dark:text-white">
          {formatPrice(product.price)}
        </span>
        <button
          type="button"
          onClick={handleCopyId}
          title={product._id}
          className="flex items-center gap-1 rounded-md px-1.5 py-1 font-mono text-xs text-ink-400 transition-colors hover:bg-ink-50 hover:text-ink-600 dark:hover:bg-ink-800 dark:hover:text-ink-300"
        >
          <FiCopy className="text-[11px]" /> {truncateId(product._id)}
        </button>
      </div>
    </motion.div>
  )
}
