import { useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'

export default function BackToTop() {
  useEffect(() => {
    const btn = document.getElementById('toTop')
    const onScroll = () => {
      if (!btn) return
      if (window.scrollY > 400) btn.classList.remove('opacity-0', 'pointer-events-none')
      else btn.classList.add('opacity-0', 'pointer-events-none')
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button id="toTop" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 z-40 rounded-full border border-white/10 bg-white/10 p-3 backdrop-blur transition hover:bg-white/20 opacity-0 pointer-events-none" aria-label="Back to top">
      <ArrowUpRight className="rotate-[-45deg]" />
    </button>
  )
}
