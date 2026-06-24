import { SectionTitle } from '@/components/SectionTitle'
import { APIExplorer } from '@/components/APIExplorer'
import { PaginationDiagram } from '@/components/PaginationDiagram'

export function Api() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
          Reference
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-900 dark:text-white">
          API Documentation
        </h1>
        <p className="mt-3 text-base text-ink-500 dark:text-ink-400">
          Three endpoints power this UI. Only the first is part of the backend's documented contract today.
        </p>
      </div>

      <div className="mt-10 space-y-6">
        <APIExplorer
          method="GET"
          path="/api/products"
          purpose="Returns a page of products ordered newest-first, optionally filtered by category, using an opaque cursor for the next page."
          parameters={[
            { name: 'limit', type: 'integer', required: false, description: '1–100, defaults to 20.' },
            {
              name: 'category',
              type: 'enum',
              required: false,
              description: 'Electronics, Fashion, Home, Sports, Books, or Toys.',
            },
            {
              name: 'cursor',
              type: 'string',
              required: false,
              description: 'Opaque Base64URL token returned as nextCursor by the previous response.',
            },
          ]}
          requestExample={'GET /api/products?limit=20&category=Electronics'}
          responseExample={JSON.stringify(
            {
              success: true,
              data: [
                {
                  _id: '665f1a2b9c1d4e0012345678',
                  name: 'Wireless Mouse',
                  category: 'Electronics',
                  price: 24.99,
                  createdAt: '2026-05-02T10:15:00.000Z',
                },
              ],
              pagination: { nextCursor: 'eyJjcmVhdGVkQXQiOi...', hasMore: true, limit: 20 },
            },
            null,
            2,
          )}
        />

        <APIExplorer
          method="GET"
          path="/api/products/stats"
          purpose="Returns the total product count so the Home page can decide whether to warn before reseeding."
          requestExample={'GET /api/products/stats'}
          responseExample={JSON.stringify({ success: true, data: { totalProducts: 200000 } }, null, 2)}
          notDocumented
        />

        <APIExplorer
          method="POST"
          path="/api/seed"
          purpose="Triggers the batched seed script (2,000 documents per insertMany() call) to populate the collection."
          requestExample={'POST /api/seed'}
          responseExample={JSON.stringify(
            { success: true, message: 'Seed complete', data: { inserted: 200000, totalProducts: 200000 } },
            null,
            2,
          )}
          notDocumented
        />
      </div>

      <div className="mt-16">
        <SectionTitle
          eyebrow="Design decision"
          title="Why cursor pagination, not offset"
          description="Offset pagination (skip/limit) re-scans and discards an ever-larger range of index entries on every page. Cursor pagination seeks directly from the last row's position, so the work per page stays constant."
        />
        <div className="mt-8 rounded-2xl border border-ink-100 bg-white p-6 shadow-soft dark:border-ink-800 dark:bg-ink-900 sm:p-8">
          <PaginationDiagram />
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-mono text-sm font-semibold text-amber-600 dark:text-amber-400">
                Offset (skip/limit)
              </h3>
              <ul className="mt-2 space-y-1.5 text-sm text-ink-500 dark:text-ink-400">
                <li>Cost grows with page depth — page 5,000 scans thousands of documents just to discard them.</li>
                <li>Concurrent inserts shift every offset below them, so rows can repeat or vanish across pages.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-sm font-semibold text-emerald-600 dark:text-emerald-400">Cursor (seek)</h3>
              <ul className="mt-2 space-y-1.5 text-sm text-ink-500 dark:text-ink-400">
                <li>
                  Each query seeks on <code className="font-mono text-xs">{'{ createdAt, _id }'}</code>, so the index
                  lookup costs the same at any depth.
                </li>
                <li>
                  A normally timestamped insert sorts ahead of the cursor and can't shift, duplicate, or skip existing
                  rows.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
