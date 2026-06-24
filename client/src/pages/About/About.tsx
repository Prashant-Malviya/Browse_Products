import { motion } from 'framer-motion'
import { FiCompass, FiHeart, FiTrendingUp, FiUsers, FiZap } from 'react-icons/fi'
import { SectionTitle } from '@/components/SectionTitle'

const PILLARS = [
  {
    icon: <FiCompass />,
    title: 'Mission',
    description: 'Help startups build and strengthen their products using artificial intelligence.',
  },
  {
    icon: <FiTrendingUp />,
    title: 'Vision',
    description: 'Challenge existing norms and bring a measurable, positive impact to society every day.',
  },
  {
    icon: <FiZap />,
    title: 'Innovation',
    description: 'Apply advanced analytics across video, image, and text to solve real product problems.',
  },
  {
    icon: <FiHeart />,
    title: 'AI Solutions',
    description: 'Work with national and global clients as hands-on experts in applied AI, not just consultants.',
  },
  {
    icon: <FiUsers />,
    title: 'Community',
    description: 'Grow AI Champ, a collaborative community where everyone learns, grows, and supports one another.',
  },
]

export function About() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
          About
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink-900 dark:text-white">
          About CodeVector Labs
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-600 dark:text-ink-300">
          CodeVector Labs provides AI solutions, with expertise in advanced analytics across video, image, and text.
          Working with national and global clients, the team focuses on challenging existing norms and bringing a
          positive impact to society every day.
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink-600 dark:text-ink-300">
          CodeVector is a software-based startup based in Raipur, helping startups build and strengthen their products
          using artificial intelligence.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PILLARS.map((pillar, index) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft dark:border-ink-800 dark:bg-ink-900"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              {pillar.icon}
            </div>
            <h3 className="mt-3 font-display text-base font-semibold text-ink-900 dark:text-white">{pillar.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{pillar.description}</p>
          </motion.div>
        ))}
      </div>

      <SectionTitle eyebrow="Initiative" title="AI Champ" className="mt-16" />
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mt-6 rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-8 shadow-soft dark:border-emerald-500/20 dark:from-emerald-500/10 dark:to-ink-900"
      >
        <p className="text-base leading-relaxed text-ink-700 dark:text-ink-200">
          On a mission to empower and help{' '}
          <strong className="text-emerald-700 dark:text-emerald-400">10 million people</strong> learn AI with
          industry-standard skills, through a collaborative community where everyone learns, grows, and supports one
          another.
        </p>
        <a
          href="https://www.aichamp.in"
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
        >
          Visit aichamp.in
        </a>
      </motion.div>
    </div>
  )
}
