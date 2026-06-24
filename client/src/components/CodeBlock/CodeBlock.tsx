import { useState } from 'react'
import { FiCheck, FiCopy } from 'react-icons/fi'
import { copyToClipboard } from '@/utils'

interface CodeBlockProps {
  code: string
  label?: string
}

export function CodeBlock({ code, label }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    const ok = await copyToClipboard(code)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-ink-800 bg-ink-950">
      <div className="flex items-center justify-between border-b border-ink-800 px-4 py-2">
        <span className="font-mono text-xs text-ink-400">{label ?? 'snippet'}</span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code"
          className="flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-xs text-ink-300 transition-colors hover:bg-ink-800 hover:text-white"
        >
          {copied ? (
            <>
              <FiCheck className="text-emerald-400" /> Copied
            </>
          ) : (
            <>
              <FiCopy /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="thin-scrollbar overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-ink-100">
        <code>{code}</code>
      </pre>
    </div>
  )
}
