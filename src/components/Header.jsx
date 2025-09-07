import { useRef, useMemo, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import SocialBar from './SocialBar'
import { PrimaryButton, GhostButton } from './Buttons'
import { ArrowUpRight, MousePointer2 } from 'lucide-react'
import { fadeUp, stagger } from '../lib/animations'
import { PROFILE } from '../config'
import LatestPublicationChip from './LatestPublicationChip'

const ROTATING = [
  'Artificial Intelligence',
  'NLP • Computer Vision',
  'Machine Learning',
  'Data Science',
  'Frontend Development',
]

function RotatingWords({ words = ROTATING, interval = 2200 }) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIdx((p) => (p + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words, interval])
  return (
    <div className="relative h-6 overflow-y-hidden text-slate-300">
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="inline-block text-sm sm:text-base"
          aria-live="polite"
        >
          {words[idx]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

export default function Header() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yBack = useTransform(scrollYProgress, [0, 1], [0, -60])
  const yFront = useTransform(scrollYProgress, [0, 1], [0, 60])

  // "Aryan Singh" -> "AS"
  const initials = useMemo(() => {
    if (!PROFILE?.name) return 'AS'
    return PROFILE.name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join('') || 'AS'
  }, [])

  return (
    <header id="home" ref={ref} role="banner" className="relative overflow-hidden">
      {/* Background: soft grid + radial glows + ultra subtle noise */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              `linear-gradient(transparent 23px, rgba(255,255,255,.07) 24px),
               linear-gradient(90deg, transparent 23px, rgba(255,255,255,.07) 24px)`,
            backgroundSize: '24px 24px',
          }}
        />
        {/* radial glow blobs */}
        <motion.div style={{ y: yBack }} className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl" />
        <motion.div style={{ y: yFront }} className="absolute -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-purple-500/15 blur-3xl" />
        {/* fine noise for depth */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage:
              'url("data:image/svg+xml;utf8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.25\'/%3E%3C/svg%3E")',
          }}
        />
        {/* vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/25" />
      </div>

      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.3, once: true }}
        className="grid grid-cols-1 items-center gap-10 py-16 sm:py-24 md:grid-cols-2"
      >
        {/* Left: copy + CTA */}
        <motion.div variants={fadeUp} aria-label="Intro">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200 backdrop-blur-sm">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
             <span className="ml-1 font-medium text-white">Data Science / AI / ML   </span>
          </div>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Hi, I’m{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              {PROFILE.name || 'Aryan Singh'}
            </span>
          </h1>

          {/* rotating subline */}
          <div className="mt-2">
            <RotatingWords />
          </div>

          <p className="mt-4 max-w-xl text-slate-300">
            I’m an M.Tech candidate specializing in Data Science & AI—crafting robust ML pipelines, clear insights, and production-grade UX.
          </p>
          {/* New Latest publication of medium */}
          <LatestPublicationChip fallback={{ title: 'Read my latest article on Medium', url: 'https://medium.com/@aryansingh19461' }} />
          {/* CTAs */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <PrimaryButton href="#projects">
              View Projects <ArrowUpRight size={16} />
            </PrimaryButton>
            {PROFILE?.resume ? (
              <GhostButton href={PROFILE.resume} target="_blank" rel="noopener noreferrer">
                View Résumé
              </GhostButton>
            ) : (
              <GhostButton href="#contact">Contact Me</GhostButton>
            )}
          </div>

          {/* socials */}
          <div className="mt-8">
            <SocialBar />
          </div>

          {/* small stats row */}
    
        </motion.div>

        {/* Right: premium monogram card (replaces photo) */}
        <motion.div variants={fadeUp} className="relative" aria-label="Brand monogram">
          {/* glow ring */}
          <div className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-[conic-gradient(from_180deg_at_50%_50%,_rgba(34,211,238,.1),_rgba(168,85,247,.12),_transparent_70%)] blur-2xl" />

          {/* gradient border card */}
          <motion.div
            whileHover={{ scale: 1.015 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="mx-auto aspect-square w-56 rounded-2xl p-[1.5px] sm:w-64 md:w-72"
            style={{
              background:
                'linear-gradient(135deg, rgba(34,211,238,.6), rgba(59,130,246,.5), rgba(168,85,247,.6))',
            }}
          >
            <div className="flex h-full w-full items-center justify-center rounded-[14px] border border-white/10 bg-slate-900/70 shadow-2xl backdrop-blur">
              {/* inner tile */}
              <div className="relative flex h-[85%] w-[85%] items-center justify-center rounded-xl bg-gradient-to-br from-slate-800/70 to-slate-900/70 ring-1 ring-white/10">
                {/* soft shine */}
                <div className="pointer-events-none absolute inset-x-6 top-4 h-12 rounded-full bg-white/10 blur-2xl" />
                <span className="select-none text-6xl font-extrabold tracking-tight text-white sm:text-7xl">
                  {initials}
                </span>
                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/5" />
              </div>
            </div>
          </motion.div>

          {/* bottom caption */}
          <div className="mt-4 text-center text-sm text-slate-400">
            {PROFILE.title || 'Data Science • AI • Analytics'}
          </div>
        </motion.div>
      </motion.section>

      {/* scroll cue */}
      <div className="mt-2 flex items-center justify-center pb-6">
        <a href="#projects" className="group inline-flex items-center gap-2 text-slate-400 hover:text-slate-200">
          <MousePointer2 className="h-4 w-4 animate-pulse" />
          <span className="text-sm">Explore projects</span>
          <span className="block h-px w-8 translate-x-0 bg-slate-500 transition-all group-hover:w-16 group-hover:translate-x-1" />
        </a>
      </div>
    </header>
  )
}
