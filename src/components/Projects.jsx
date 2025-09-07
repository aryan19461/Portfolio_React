// src/components/Projects.jsx
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import { dataAnalysisProjects, mlProjects, webProjects } from '../data/projects'
import { ExternalLink } from 'lucide-react'
import { fadeUp, stagger, hoverLift } from '../lib/animations'
import { useState } from 'react'

export default function Projects() {
  // 'da' = Data Set Analysis, 'ml' = Machine Learning, 'web' = Web Dev
  const [tab, setTab] = useState('da')

  const tabs = [
    { id: 'da', label: 'Data Set Analysis', list: dataAnalysisProjects },
    { id: 'ml', label: 'Machine Learning Projects', list: mlProjects },
    { id: 'web', label: 'Web Development Projects', list: webProjects },
  ]

  const current = tabs.find(t => t.id === tab) || tabs[0]
  const list = current.list

  return (
    <section id="projects" className="scroll-mt-24 py-16 sm:py-20">
      <SectionHeader
        kicker="Projects"
        title="Things I’ve Built"
        sub=" Data Set Analysis, Machine Learning, or Web Development."
      />

      {/* Tabs with animated pill */}
      <div
        className="relative mb-6 inline-flex rounded-xl border border-white/10 bg-white/5 p-1"
        role="tablist"
        aria-label="Project Categories"
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            id={`tab-${t.id}`}
            onClick={() => setTab(t.id)}
            className={`relative z-10 rounded-lg px-4 py-2 text-sm font-medium transition ${
              tab === t.id ? 'text-slate-950' : 'text-slate-200 hover:text-white'
            }`}
          >
            {t.label}
            {tab === t.id && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 -z-10 rounded-lg bg-cyan-400 shadow"
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Cards with accent gradient borders */}
      <motion.div
        id={`panel-${current.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${current.id}`}
        variants={stagger}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {list.map((p, idx) => (
          <motion.div
            key={`${current.id}-${idx}`}
            variants={fadeUp}
            whileHover={hoverLift}
            className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-cyan-500/40 via-purple-500/30 to-transparent"
          >
            <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold leading-tight">{p.title}</h3>
                <a href={p.link} className="text-slate-300 hover:text-white" aria-label="Open project">
                  <ExternalLink size={18} />
                </a>
              </div>
              <p className="mt-2 text-sm text-slate-300">{p.desc}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-slate-900/60 px-2 py-0.5 text-[11px] text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
