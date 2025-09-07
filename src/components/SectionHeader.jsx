import { motion } from 'framer-motion'
import { fadeUp, stagger } from '../lib/animations'

export default function SectionHeader({ kicker, title, sub }) {
  return (
    <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ amount: 0.4, once: true }} className="mb-8">
      <motion.p variants={fadeUp} className="text-xs uppercase tracking-wider text-cyan-300/90">{kicker}</motion.p>
      <motion.h2 variants={fadeUp} className="mt-1 text-3xl font-bold">{title}</motion.h2>
      {sub && <motion.p variants={fadeUp} className="mt-2 max-w-2xl text-slate-300">{sub}</motion.p>}
    </motion.div>
  )
}
