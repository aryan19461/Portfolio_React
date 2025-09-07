import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function MagneticButton({ as='a', href, children, variant='primary', type, onClick }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.2 })
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.2 })

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const mx = e.clientX - (rect.left + rect.width / 2)
    const my = e.clientY - (rect.top + rect.height / 2)
    const strength = 12
    x.set(Math.max(-strength, Math.min(strength, mx / 10)))
    y.set(Math.max(-strength, Math.min(strength, my / 10)))
  }
  const onLeave = () => { x.set(0); y.set(0) }

  const baseCls = variant === 'primary'
    ? 'inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow hover:brightness-110'
    : 'inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-white hover:bg-white/5'

  if (as === 'button') {
    return (
      <button ref={ref} type={type} onClick={onClick} onMouseMove={onMove} onMouseLeave={onLeave} className="relative inline-block">
        <motion.span style={{ x: springX, y: springY }} className={baseCls}>
          {children}
        </motion.span>
      </button>
    )
  }

  return (
    <a href={href} ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="relative inline-block">
      <motion.span style={{ x: springX, y: springY }} className={baseCls}>
        {children}
      </motion.span>
    </a>
  )
}

export const PrimaryButton = (props) => <MagneticButton {...props} variant='primary' />
export const GhostButton = (props) => <MagneticButton {...props} variant='ghost' />
