import { motion } from 'framer-motion'
import SocialBar from './SocialBar'
import { FileText } from 'lucide-react'
import { SOCIAL } from '../data/social'

export default function Navbar({ active }) {
  const links = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/70 backdrop-blur supports-[backdrop-filter]:bg-slate-900/70">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <span className="inline-block h-3 w-3 rounded-full bg-cyan-500 shadow-[0_0_20px] shadow-cyan-400/60" />
            Aryan
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent font-bold animate-pulse">
              X
            </span>
          </a>
        <ul className="relative hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <li key={l.id} className="relative">
              <a href={`#${l.id}`} className="peer text-sm text-slate-300 transition-colors hover:text-white">
                {l.label}
              </a>
              {active === l.id && (
                <motion.div layoutId="nav-underline" className="absolute -bottom-2 left-0 right-0 h-[2px] bg-cyan-400" />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <SocialBar compact />
          {SOCIAL.resume && (
            <a
              href={SOCIAL.resume}
              download
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2 text-sm font-semibold text-white hover:bg-white/5"
            >
              <FileText size={16} /> Resume
            </a>
          )}
        </div>
      </nav>
    </div>
  )
}
