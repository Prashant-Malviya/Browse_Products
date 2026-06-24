import { useState, type FormEvent } from 'react'
import toast from 'react-hot-toast'
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiSend, FiGlobe } from 'react-icons/fi'

const CONTACT_DETAILS = [
  { icon: <FiMail />, label: 'Email', value: 'hello@codevectorlabs.com', href: 'mailto:hello@codevectorlabs.com' },
  { icon: <FiGlobe />, label: 'Website', value: 'www.aichamp.in', href: 'https://www.aichamp.in' },
  { icon: <FiLinkedin />, label: 'LinkedIn', value: 'linkedin.com/company/codevector-labs', href: '#' },
  { icon: <FiGithub />, label: 'GitHub', value: 'github.com/codevector-labs', href: '#' },
]

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setIsSubmitting(true)
    // UI-only — no backend endpoint for this form.
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success("Message captured locally — there's no backend wired up for this form yet.")
      setForm({ name: '', email: '', message: '' })
    }, 600)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
          Get in touch
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-900 dark:text-white">Contact</h1>
        <p className="mt-3 text-base text-ink-500 dark:text-ink-400">CodeVector Labs · Raipur, India</p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-4">
          {CONTACT_DETAILS.map((detail) => (
            <a
              key={detail.label}
              href={detail.href}
              target={detail.href.startsWith('http') || detail.href.startsWith('mailto') ? '_blank' : undefined}
              rel="noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-ink-100 bg-white p-4 shadow-soft transition-colors hover:border-indigo-200 dark:border-ink-800 dark:bg-ink-900 dark:hover:border-indigo-500/40"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                {detail.icon}
              </span>
              <span>
                <span className="block text-xs text-ink-400 dark:text-ink-500">{detail.label}</span>
                <span className="block text-sm font-medium text-ink-800 dark:text-ink-200">{detail.value}</span>
              </span>
            </a>
          ))}

          <div className="overflow-hidden rounded-2xl border border-ink-100 dark:border-ink-800">
            <div className="flex h-40 flex-col items-center justify-center gap-2 bg-ink-100 text-ink-400 dark:bg-ink-800 dark:text-ink-500">
              <FiMapPin className="text-2xl" />
              <span className="text-sm">Map placeholder — Raipur, Chhattisgarh, India</span>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft dark:border-ink-800 dark:bg-ink-900 sm:p-8"
        >
          <div className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-ink-700 dark:text-ink-300">
                Name
              </label>
              <input
                id="name"
                required
                value={form.name}
                onChange={(event) => setForm((previous) => ({ ...previous, name: event.target.value }))}
                className="mt-1.5 w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-800 focus:border-indigo-400 dark:border-ink-700 dark:bg-ink-950 dark:text-ink-200"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ink-700 dark:text-ink-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(event) => setForm((previous) => ({ ...previous, email: event.target.value }))}
                className="mt-1.5 w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-800 focus:border-indigo-400 dark:border-ink-700 dark:bg-ink-950 dark:text-ink-200"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-ink-700 dark:text-ink-300">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(event) => setForm((previous) => ({ ...previous, message: event.target.value }))}
                className="mt-1.5 w-full resize-none rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-800 focus:border-indigo-400 dark:border-ink-700 dark:bg-ink-950 dark:text-ink-200"
                placeholder="How can we help?"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-70"
            >
              <FiSend /> {isSubmitting ? 'Sending…' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
