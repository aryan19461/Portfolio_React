import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function MagneticIconLink({ href, children, className='', ariaLabel, target='_blank', rel='noreferrer' }) {
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
    const strength = 10
    x.set(Math.max(-strength, Math.min(strength, mx / 12)))
    y.set(Math.max(-strength, Math.min(strength, my / 12)))
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <a href={href} ref={ref} target={target} rel={rel} aria-label={ariaLabel} onMouseMove={onMove} onMouseLeave={onLeave} className={`relative inline-block ${className}`}>
      <motion.span style={{ x: springX, y: springY }} className="inline-flex items-center gap-2">
        {children}
      </motion.span>
    </a>
  )
}
