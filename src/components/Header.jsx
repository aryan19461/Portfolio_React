import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Badge from './Badge'
import SectionHeader from './SectionHeader'
import SocialBar from './SocialBar'
import { PrimaryButton, GhostButton } from './Buttons'
import { ArrowUpRight } from 'lucide-react'
import { fadeUp, stagger } from '../lib/animations'

export default function Header() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yBack = useTransform(scrollYProgress, [0, 1], [0, -60])
  const yFront = useTransform(scrollYProgress, [0, 1], [0, 60])

  return (
    <header id="home" ref={ref} className="relative overflow-hidden">
      {/* Parallax gradient blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div style={{ y: yBack }} className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />
        <motion.div style={{ y: yFront }} className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-purple-500/15 blur-3xl" />
      </div>

      <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={{ amount: 0.3, once: true }} className="grid grid-cols-1 items-center gap-10 py-16 sm:py-24 md:grid-cols-2">
        <motion.div variants={fadeUp}>
          <Badge>
            Open to roles in <span className="font-medium text-white">Data Science / AI</span>
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Hi, I’m <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">Aryan Singh</span>
          </h1>
          <p className="mt-4 max-w-xl text-slate-300">
            I am a passionate M.Tech graduate specializing in Data Science and AI, eager to contribute my skills and knowledge to innovative projects and dynamic teams.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <PrimaryButton href="#projects">View Projects <ArrowUpRight size={16} /></PrimaryButton>
            <GhostButton href="#contact">Contact Me</GhostButton>
          </div>

          <div className="mt-8"><SocialBar /></div>
        </motion.div>

        <motion.div variants={fadeUp} className="relative">
<motion.div
  whileHover={{ scale: 1.02 }}
  className="mx-auto w-56 sm:w-64 md:w-72 aspect-square rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-1 shadow-2xl overflow-hidden"
>
  <img
    src="/public/aryan_image.jpg"
    alt="Aryan Singh"
    className="h-full w-full rounded-[calc(theme(borderRadius.2xl)-0.25rem)] object-cover object-top"
  />
</motion.div>
        </motion.div>
      </motion.section>
    </header>
  )
}
