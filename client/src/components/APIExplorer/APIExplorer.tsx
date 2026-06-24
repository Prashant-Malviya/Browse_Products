import { motion } from 'framer-motion'
import { FiAlertTriangle, FiLink } from 'react-icons/fi'
import { CodeBlock } from '@/components/CodeBlock'
import { copyToClipboard } from '@/utils'
import { API_BASE_URL } from '@/constants'
import { useState } from 'react'
import toast from 'react-hot-toast'

export interface ApiParameter {
  name: string
  type: string
  required: boolean
  description: string
}

interface APIExplorerProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: string
  purpose: string
  parameters?: ApiParameter[]
  requestExample: string
  responseExample: string
  /** Flags endpoints the frontend brief expects but the backend README doesn't document. */
  notDocumented?: boolean
}

const methodStyles: Record<string, string> = {
  GET: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300',

  POST: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300',

  PUT: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300',

  DELETE: 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300',
}

export function APIExplorer({
  method,
  path,
  purpose,
  parameters,
  requestExample,
  responseExample,
  notDocumented,
}: APIExplorerProps) {
  const [, setCopied] = useState(false)

  async function handleCopyUrl() {
    const ok = await copyToClipboard(`${API_BASE_URL}${path}`)
    if (ok) {
      setCopied(true)
      toast.success('Endpoint URL copied')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft dark:border-ink-800 dark:bg-ink-900"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className={`rounded-md px-2 py-1 font-mono text-xs font-semibold ${methodStyles[method]}`}>
            {method}
          </span>
          <code className="font-mono text-sm text-ink-800 dark:text-ink-200">{path}</code>
        </div>
        <button
          type="button"
          onClick={handleCopyUrl}
          className="flex items-center gap-1.5 rounded-lg border border-ink-200 px-3 py-1.5 text-xs font-medium text-ink-600 transition-colors hover:bg-ink-50 dark:border-ink-700 dark:text-ink-300 dark:hover:bg-ink-800"
        >
          <FiLink className="text-sm" /> Copy URL
        </button>
      </div>



      <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-400">{purpose}</p>

      {parameters && parameters.length > 0 && (
        <div className="mt-4 overflow-hidden rounded-lg border border-ink-100 dark:border-ink-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-ink-50 dark:bg-ink-800/60">
              <tr>
                <th className="px-3 py-2 font-medium text-ink-500 dark:text-ink-400">Param</th>
                <th className="px-3 py-2 font-medium text-ink-500 dark:text-ink-400">Type</th>
                <th className="px-3 py-2 font-medium text-ink-500 dark:text-ink-400">Required</th>
                <th className="px-3 py-2 font-medium text-ink-500 dark:text-ink-400">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100 dark:divide-ink-800">
              {parameters.map((param) => (
                <tr key={param.name}>
                  <td className="px-3 py-2 font-mono text-xs text-ink-800 dark:text-ink-200">{param.name}</td>
                  <td className="px-3 py-2 text-xs text-ink-500 dark:text-ink-400">{param.type}</td>
                  <td className="px-3 py-2 text-xs">
                    {param.required ? (
                      <span className="text-indigo-600 dark:text-indigo-400">Yes</span>
                    ) : (
                      <span className="text-ink-400">No</span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-xs text-ink-500 dark:text-ink-400">{param.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <CodeBlock label="Request" code={requestExample} />
        <CodeBlock label="Response" code={responseExample} />
      </div>
    </motion.div>
  )
}
