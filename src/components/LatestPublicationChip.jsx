// Inline helper for your header
import { useEffect, useState } from 'react'

function LatestPublicationChip({ fallback }) {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    fetch('/.netlify/functions/medium-latest')
      .then(r => r.json())
      .then(d => {
        if (!mounted) return
        if (d?.link && d?.title) setPost({ title: d.title, url: d.link })
      })
      .catch(() => {})
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [])

  const content = post || fallback
  if (!content?.url) return null

  return (
    <a
      href={content.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs backdrop-blur-sm
        ${loading ? 'bg-white/[.04] text-slate-300' : 'bg-white/5 hover:bg-white/10 text-slate-200'}`}
      aria-label="Latest publication on Medium"
    >
      <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
      <span className="text-slate-300">Latest publication:</span>
      <span className="font-medium text-white line-clamp-1">{content.title}</span>
    </a>
  )
}
export default LatestPublicationChip