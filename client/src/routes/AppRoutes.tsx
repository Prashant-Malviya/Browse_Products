import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, Products, Api, About, Contact } from './lazyPages'
import { PageLoader } from './PageLoader'

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/api" element={<Api />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-6 text-center">
      <p className="font-mono text-sm text-indigo-500">404</p>
      <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-white">Page not found</h1>
      <p className="text-sm text-ink-500 dark:text-ink-400">The page you're looking for doesn't exist.</p>
    </div>
  )
}
