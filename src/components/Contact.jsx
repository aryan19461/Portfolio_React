import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import { SOCIAL } from '../data/social'
import { CONTACT } from '../data/contact'
import { Mail, Linkedin, Phone, ArrowUpRight } from 'lucide-react'
import { fadeUp, stagger } from '../lib/animations'
import { PrimaryButton } from './Buttons'

export default function Contact() {
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  const submitForm = async (e) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = fd.get('name')
    const email = fd.get('email')
    const msg = fd.get('message')

    setStatus({ state: 'sending', message: 'Sending…' })

    try {
      if (CONTACT.mode === 'formspree') {
        if (!CONTACT.formspreeId || CONTACT.formspreeId.startsWith('YOUR_')) {
          throw new Error('Set CONTACT.formspreeId')
        }
        const res = await fetch(`https://formspree.io/f/${CONTACT.formspreeId}`, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message: msg }),
        })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(data?.error || 'Formspree error')
        setStatus({ state: 'success', message: 'Thanks! Your message has been sent.' })
        e.currentTarget.reset()
      } else if (CONTACT.mode === 'emailjs') {
        const emailjs = (await import('@emailjs/browser')).default
        if (!CONTACT.emailjs.serviceId || !CONTACT.emailjs.templateId || !CONTACT.emailjs.publicKey) {
          throw new Error('Set EmailJS serviceId, templateId, and publicKey in CONTACT.emailjs')
        }
        await emailjs.send(
          CONTACT.emailjs.serviceId,
          CONTACT.emailjs.templateId,
          { from_name: name, reply_to: email, message: msg },
          { publicKey: CONTACT.emailjs.publicKey }
        )
        setStatus({ state: 'success', message: 'Thanks! Your message has been sent.' })
        e.currentTarget.reset()
      } else {
        throw new Error('Unsupported contact mode')
      }
    } catch (err) {
      setStatus({ state: 'error', message: err?.message || 'Something went wrong. Try again later.' })
    }
  }

  const isSending = status.state === 'sending'

  return (
    <section id="contact" className="scroll-mt-24 py-16 sm:py-20">
      <SectionHeader
        kicker="Contact"
        title="Reach Out To Me"
        sub="Interested in collaborating or hiring? Let’s talk."
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {/* Direct links */}
        <motion.div variants={fadeUp} className="rounded-2xl border border-white/110 bg-white/52 p-6">
          <h3 className="text-lg font-semibold">Reach me directly</h3>
          <div className="mt-3 space-y-2 text-slate-300">
            <a className="flex items-center gap-2 hover:text-white" href={SOCIAL.email}>
              <Mail size={16} /> Email
            </a>
            <a
              className="flex items-center gap-2 hover:text-white"
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
            {SOCIAL.phone && (
              <a className="flex items-center gap-2 hover:text-white" href={SOCIAL.phone}>
                <Phone size={16} /> Phone
              </a>
            )}
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.form
          variants={fadeUp}
          onSubmit={submitForm}
          className="rounded-2xl border border-white/10 bg-white/5 p-6"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm text-slate-300">Name</label>
              <input
                name="name"
                required
                className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
            <div>
              <label className="text-sm text-slate-300">Email</label>
              <input
                type="email"
                name="email"
                required
                className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="text-sm text-slate-300">Message</label>
            <textarea
              name="message"
              rows={5}
              required
              className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
          <div className="mt-5 flex items-center gap-3">
            <PrimaryButton as="button" type="submit" disabled={isSending}>
              {isSending ? 'Sending…' : 'Send'} <ArrowUpRight size={16} />
            </PrimaryButton>
            <span
              aria-live="polite"
              className={`text-sm ${
                status.state === 'success'
                  ? 'text-emerald-300'
                  : status.state === 'error'
                  ? 'text-rose-300'
                  : 'text-slate-400'
              }`}
            >
              {status.message}
            </span>
          </div>
          
          
        </motion.form>
      </motion.div>
    </section>
  )
}
