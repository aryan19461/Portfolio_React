import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import { fadeUp, stagger } from '../lib/animations'
import { ExternalLink } from 'lucide-react'

const conferences = [
  {
    title: 'Comprehensive Survey of Deepfake Detection Models: From CNNs to Transformers',
    venue: 'ICASET Conference',
    year: '2025',
    status: 'Published',
    link: '#',
  },
  {
    title: 'Harnessing Artificial Intelligence to Measure the Effectiveness of Adaptive Learning Models',
    venue: 'ICTCS Conference',
    year: '2025',
    status: 'Published',
     link: 'https://link.springer.com/chapter/10.1007/978-3-032-19678-1_39',
  },
]

const publications = [
  {
    title: 'Generalizable Deepfake Detection with Keras CNNs and Explainable Gradio-Based Interfaces',
    venue: 'Journal Submission',
    year: '2026',
    status: 'Under Review',
    link: '#',
  },
]

export default function Publications() {
  const items = [...conferences, ...publications]

  return (
    <section id="publications" className="scroll-mt-24 py-16 sm:py-20">
      <SectionHeader
        kicker="Research"
        title="Conferences & Publications"
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {items.map((item, index) => (
          <motion.article
            key={index}
            variants={fadeUp}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-cyan-300">
                  {item.venue} • {item.year}
                </p>
                <h3 className="mt-2 text-lg font-semibold leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-300">
                  Status: {item.statunpms}
                </p>
              </div>

              <a
                href={item.link}
                className="text-slate-300 hover:text-white"
                target="_blank"
                rel="noreferrer"
                aria-label="Open publication"
              >
                <ExternalLink size={18} />
              </a>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}