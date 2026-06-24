import { FiLoader } from 'react-icons/fi'

export function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <FiLoader className="animate-spin text-2xl text-indigo-500" aria-label="Loading page" />
    </div>
  )
}
