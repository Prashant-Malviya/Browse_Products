import { Link } from 'react-router-dom'
import { FiGithub, FiZap } from 'react-icons/fi'

const TECH_STACK = ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Cursor Pagination']

const FOOTER_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/api', label: 'API' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-white dark:border-ink-800 dark:bg-ink-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <FiZap />
            </span>
            <span className="font-display text-base font-bold text-ink-900 dark:text-white">Product Browser</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-ink-500 dark:text-ink-400">
            A showcase of index-backed cursor pagination over a 200,000-product MongoDB collection.
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink-600 transition-colors hover:text-indigo-600 dark:text-ink-300 dark:hover:text-indigo-400"
          >
            <FiGithub /> View on GitHub
          </a>
        </div>

        <div>
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wide text-ink-400 dark:text-ink-500">
            Navigation
          </h3>
          <ul className="mt-4 space-y-2.5">
            {FOOTER_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-ink-600 transition-colors hover:text-indigo-600 dark:text-ink-300 dark:hover:text-indigo-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wide text-ink-400 dark:text-ink-500">
            Built With
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-ink-200 px-2.5 py-1 text-xs font-medium text-ink-600 dark:border-ink-700 dark:text-ink-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-ink-100 px-4 py-5 text-center text-xs text-ink-400 sm:px-6 dark:border-ink-800 dark:text-ink-500 lg:px-8">
        © {new Date().getFullYear()} Product Browser. Built as a backend engineering showcase.
      </div>
    </footer>
  )
}
