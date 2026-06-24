import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ScrollToTop } from '@/components/ScrollToTop'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { AppRoutes } from '@/routes'

function ScrollRestoration() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

function App() {
  return (
    <ErrorBoundary>
      <div className="flex min-h-screen flex-col bg-ink-50 text-ink-900 dark:bg-ink-950 dark:text-ink-100">
        <Navbar />
        <ScrollRestoration />
        <main className="flex-1">
          <AppRoutes />
        </main>
        <Footer />
        <ScrollToTop />
        <Toaster
          position="top-right"
          toastOptions={{
            style: { borderRadius: '12px', fontSize: '14px', padding: '10px 14px' },
          }}
        />
      </div>
    </ErrorBoundary>
  )
}

export default App
