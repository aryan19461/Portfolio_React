import { Github, Globe, PenSquare, Linkedin } from 'lucide-react'
import { MagneticIconLink } from './magnetics'
import { SOCIAL } from '../data/social'

export default function SocialBar({ compact=false }) {
  const size = compact ? 18 : 20
  const itemCls = 'group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 hover:bg-white/10 transition'
  return (
    <div className={`flex ${compact ? 'gap-2' : 'gap-3'}`}>
      <MagneticIconLink href={SOCIAL.github} ariaLabel="GitHub" className={itemCls}>
        <Github size={size} /> {!compact && <span>GitHub</span>}
      </MagneticIconLink>
      <MagneticIconLink href={SOCIAL.netlify} ariaLabel="Netlify" className={itemCls}>
        <Globe size={size} /> {!compact && <span>Netlify</span>}
      </MagneticIconLink>
      <MagneticIconLink href={SOCIAL.medium} ariaLabel="Medium" className={itemCls}>
        <PenSquare size={size} /> {!compact && <span>Medium</span>}
      </MagneticIconLink>
      <MagneticIconLink href={SOCIAL.linkedin} ariaLabel="LinkedIn" className={itemCls}>
        <Linkedin size={size} /> {!compact && <span>LinkedIn</span>}
      </MagneticIconLink>
    </div>
  )
}
