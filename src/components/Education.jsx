import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import { GraduationCap } from 'lucide-react'
import { fadeUp, stagger } from '../lib/animations'

export default function Education() {
  const items = [
    { school: 'Edureka', degree: ' Gen AI Masters Program.', period: '2025 – 2026', details: 'AI/ML, NLP, Deep Learning' },
    { school: 'Internshala  ', degree: 'Data Science ', period: '2024 – 2025', details: ' Data Analysis, Data science , Python, NLP, AI ,Machine Learning, Deep Learning' },
    { school: 'SRM Institute of Science & Technology (NCR)', degree: 'M.Tech – Computer Science & Engineering', period: '2024 – 2026', details: 'Research focus: AI/ML, NLP, Deep Learning.' },
    { school: 'K.R. Mangalam University', degree: 'B.Tech – Computer Science & Engineering', period: '2019 – 2023', details: 'Projects in Web Development.' },
  ]
  return (
    <section id="education" className="scroll-mt-24 py-16 sm:py-20">
      <SectionHeader kicker="Education" title="Modern Education" sub="A brief academic timeline." />
      <motion.ol variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="relative space-y-4 border-l border-white/10 pl-6">
        {items.map((it, i) => (
          <motion.li key={i} variants={fadeUp} className="relative rounded-xl border border-white/10 bg-white/5 p-4">
            <span className="absolute -left-[9px] top-5 grid h-4 w-4 place-items-center rounded-full bg-cyan-500 shadow-[0_0_0_3px] shadow-slate-950">
              <GraduationCap size={10} className="text-white" />
            </span>
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold">{it.school}</h3>
              <span className="text-xs text-slate-400">{it.period}</span>
            </div>
            <p className="text-sm text-slate-200">{it.degree}</p>
            <p className="mt-1 text-sm text-slate-400">{it.details}</p>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  )
}
