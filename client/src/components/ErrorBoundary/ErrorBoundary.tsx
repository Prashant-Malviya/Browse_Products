import { Component, type ErrorInfo, type ReactNode } from 'react'
import { FiAlertOctagon } from 'react-icons/fi'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled UI error:', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-2xl text-red-500 dark:bg-red-500/10">
            <FiAlertOctagon />
          </div>
          <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-white">
            Something broke on this page
          </h2>
          <p className="max-w-sm text-sm text-ink-500 dark:text-ink-400">
            An unexpected error stopped this view from rendering. Reloading usually fixes it.
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Reload page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
