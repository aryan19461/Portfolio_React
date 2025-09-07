import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import { fadeUp, stagger } from '../lib/animations'

export default function About() {
  const skills = ['Python','SQL','Java','React','Power BI', 'Machine Learning', 'Data Analysis', 'C++']

  return (
    <section id="about" className="scroll-mt-24 py-16 sm:py-20">
      <SectionHeader kicker="About" title="Who I Am" />
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <motion.div variants={fadeUp} className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-slate-300">
            Detail-oriented M.Tech graduate proficient in Python,Java, C++, SQL, and Power BI, seeking to leverage analytical skills to deliver impactful data-driven solutions.  
          </p>
        </motion.div>
        <motion.div variants={fadeUp} className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold">Skill Set</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((t) => (
              <motion.span key={t} whileHover={{ y: -2 }} className="rounded-full border border-white/10 bg-slate-900/60 px-3 py-1 text-xs text-slate-200">
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
