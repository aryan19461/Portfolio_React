export default function SectionDivider({ subtle=false }) {
  return (
    <div className="relative my-6 sm:my-10">
      <div className={`h-px w-full ${subtle ? 'bg-white/5' : 'bg-gradient-to-r from-transparent via-white/15 to-transparent'}`} />
    </div>
  )
}
