'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// ─── À CONFIGURER sur emailjs.com ───────────────────────────
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'
// ────────────────────────────────────────────────────────────

const siteTypes = [
  { id: 'creation', label: 'Création de site',  desc: 'Vous n\'avez pas encore de site web' },
  { id: 'refonte',  label: 'Refonte de site',   desc: 'Votre site actuel est dépassé' },
]

const budgets = [
  'Moins de 500€',
  '500€ – 1 000€',
  '1 000€ – 2 500€',
  '+ de 2 500€',
  'Je ne sais pas encore',
]

type Status = 'idle' | 'loading' | 'success' | 'error'

function YesNo({
  label, value, onChange,
}: { label: string; value: boolean | null; onChange: (v: boolean) => void }) {
  return (
    <div>
      <p className="font-syne font-bold text-[15px] text-dark mb-3">{label}</p>
      <div className="flex gap-3">
        {[true, false].map(opt => (
          <button
            key={String(opt)}
            type="button"
            onClick={() => onChange(opt)}
            className={`flex-1 py-3.5 rounded-xl border font-syne font-bold text-[14px] transition-all duration-200 ${
              value === opt
                ? 'border-orange bg-orange/5 text-orange'
                : 'border-dark/10 bg-white text-dark hover:border-dark/25'
            }`}
          >
            {opt ? 'Oui' : 'Non'}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function DevisPage() {
  const [siteType, setSiteType]   = useState('')
  const [entretien, setEntretien] = useState<boolean | null>(null)
  const [seo, setSeo]             = useState<boolean | null>(null)
  const [status, setStatus]       = useState<Status>('idle')
  const [form, setForm]           = useState({
    name: '', email: '', phone: '', budget: '', message: '',
  })

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!siteType) return
    setStatus('loading')

    const servicesLabel = [
      siteType === 'creation' ? 'Création de site' : 'Refonte de site',
      entretien === true ? 'Entretien & Suivi' : null,
      seo === true ? 'Référencement SEO' : null,
    ].filter(Boolean).join(', ')

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          phone:      form.phone || 'Non renseigné',
          services:   servicesLabel,
          entretien:  entretien === true ? 'Oui' : entretien === false ? 'Non' : 'Non précisé',
          seo:        seo === true ? 'Oui' : seo === false ? 'Non' : 'Non précisé',
          budget:     form.budget || 'Non renseigné',
          message:    form.message,
        },
        EMAILJS_PUBLIC_KEY,
      )
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen bg-bg pt-28 pb-24 px-16 overflow-hidden max-md:px-6 max-md:pt-24">

        {/* ── Décorations droite — "The Blueprint" ── */}
        <div className="absolute inset-y-0 right-0 left-[58%] pointer-events-none select-none max-lg:hidden overflow-hidden">

          {/* Grille de points */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.3 }}
            style={{
              backgroundImage: 'radial-gradient(circle, #18181B 1px, transparent 1px)',
              backgroundSize: '28px 28px',
              opacity: 0.09,
            }}
          />

          {/* Barre verticale — fine, centrée */}
          <motion.div
            className="absolute top-0 bottom-0 origin-top"
            style={{ left: '45%', width: 1.5, background: '#F97316', opacity: 0.5 }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
          />

          {/* Barre horizontale — fine */}
          <motion.div
            className="absolute left-0 right-0 origin-left"
            style={{ top: '44%', height: 1.5, background: '#F97316', opacity: 0.5 }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
          />

          {/* Intersection — petit cercle propre */}
          <motion.div
            className="absolute"
            style={{ left: 'calc(45% - 7px)', top: 'calc(44% - 7px)' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 1.4 }}
          >
            <div className="w-3.5 h-3.5 rounded-full bg-[#FFF7ED] border-2 border-orange" />
            <motion.div
              className="absolute -inset-2.5 rounded-full border border-orange/25"
              animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 2 }}
            />
          </motion.div>

          {/* Dots aux extrémités de la barre verticale */}
          {[{ y: '14%' }, { y: '76%' }].map((m, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-orange/60"
              style={{ left: 'calc(45% - 3px)', top: m.y, transform: 'translateY(-50%)' }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 1.6 + i * 0.12 }}
            />
          ))}

          {/* Tirets aux extrémités */}
          {[{ y: '14%' }, { y: '76%' }].map((t, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-orange/35"
              style={{ left: 'calc(45% - 16px)', top: t.y, width: 32 }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 1.55 + i * 0.1 }}
            />
          ))}

          {/* Carré orange — coin haut droit, plus petit et plus sobre */}
          <motion.div
            className="absolute bg-orange"
            style={{ right: 56, top: 80, width: 48, height: 48 }}
            initial={{ scale: 0, rotate: 45 }}
            animate={{ scale: 1, rotate: 45 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
          />
          <motion.div
            className="absolute border border-dark/10"
            style={{ right: 38, top: 62, width: 48, height: 48, rotate: '45deg' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          />

          {/* DEVIS — filigrane vertical */}
          <motion.div
            className="absolute font-syne font-black text-dark whitespace-nowrap"
            style={{
              fontSize: 'clamp(90px, 14vw, 180px)',
              letterSpacing: '-0.04em',
              lineHeight: 1,
              right: -16,
              top: '50%',
              transform: 'translateY(-50%) rotate(-90deg)',
              opacity: 0.035,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.035 }}
            transition={{ duration: 1.3, delay: 0.4 }}
          >
            DEVIS
          </motion.div>

        </div>

        {/* ── Header ── */}
        <motion.div
          className="max-w-2xl mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="font-inter text-[11px] font-semibold tracking-[0.12em] uppercase text-orange mb-5 flex items-center gap-2.5">
            <span className="block w-6 h-px bg-orange" />
            Devis gratuit · Sans engagement
          </p>
          <h1
            className="font-syne font-black tracking-[-0.035em] leading-[1.0] text-dark mb-5"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
          >
            Parlons de<br />votre <em className="not-italic text-orange">projet.</em>
          </h1>
          <p className="font-inter text-[15px] leading-[1.7] text-dark/45 max-w-lg">
            Remplissez ce formulaire en 2 minutes. On vous répond dans la journée avec une proposition claire — sans jargon, sans engagement.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-xl"
            >
              <div className="border border-dark/10 rounded-2xl p-12 text-center">
                <div className="w-14 h-14 rounded-full bg-orange/10 border border-orange/20 flex items-center justify-center text-2xl mx-auto mb-6">
                  ✓
                </div>
                <h2 className="font-syne font-black text-[28px] tracking-[-0.02em] text-dark mb-3">
                  Message envoyé !
                </h2>
                <p className="font-inter text-[14px] text-dark/45 leading-relaxed mb-8">
                  On a bien reçu votre demande. On vous répond dans la journée avec une proposition adaptée à votre projet.
                </p>
                <a
                  href="/"
                  className="inline-flex items-center gap-2 font-syne font-bold text-[13px] px-6 py-3 rounded-lg bg-dark text-white hover:bg-black transition-colors"
                >
                  ← Retour à l&apos;accueil
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl space-y-10"
            >

              {/* Type de site */}
              <div>
                <label className="block font-syne font-bold text-[15px] text-dark mb-4">
                  Création ou refonte ?
                  <span className="text-orange ml-1">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
                  {siteTypes.map(svc => (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => setSiteType(svc.id)}
                      className={`text-left px-5 py-4 rounded-xl border transition-all duration-200 ${
                        siteType === svc.id
                          ? 'border-orange bg-orange/5'
                          : 'border-dark/10 bg-white hover:border-dark/25'
                      }`}
                    >
                      <div className="font-syne font-bold text-[14px] text-dark mb-1">{svc.label}</div>
                      <div className="font-inter text-[12px] text-dark/40">{svc.desc}</div>
                    </button>
                  ))}
                </div>
                {!siteType && status === 'error' && (
                  <p className="text-[12px] text-red-500 mt-2">Veuillez sélectionner une option.</p>
                )}
              </div>

              {/* Entretien */}
              <div>
                <YesNo
                  label="Voulez-vous qu'on gère l'entretien de votre site ?"
                  value={entretien}
                  onChange={setEntretien}
                />
                <p className="font-inter text-[12px] text-dark/35 mt-2">
                  Mises à jour de contenu, corrections, performances — on s&apos;en occupe.
                </p>
              </div>

              {/* SEO */}
              <div>
                <YesNo
                  label="Souhaitez-vous améliorer votre visibilité sur Google ?"
                  value={seo}
                  onChange={setSeo}
                />
                <p className="font-inter text-[12px] text-dark/35 mt-2">
                  On optimise votre site pour que vos clients vous trouvent naturellement.
                </p>
              </div>

              <div className="h-px bg-dark/8" />

              {/* Name + Email */}
              <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
                <div>
                  <label className="block font-inter text-[13px] font-medium text-dark/60 mb-2">
                    Prénom & Nom <span className="text-orange">*</span>
                  </label>
                  <input
                    type="text" required value={form.name} onChange={set('name')}
                    placeholder="Marie Dupont"
                    className="w-full px-4 py-3.5 rounded-xl border border-dark/10 bg-white font-inter text-[14px] text-dark placeholder:text-dark/25 focus:outline-none focus:border-orange transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-inter text-[13px] font-medium text-dark/60 mb-2">
                    Email <span className="text-orange">*</span>
                  </label>
                  <input
                    type="email" required value={form.email} onChange={set('email')}
                    placeholder="marie@exemple.fr"
                    className="w-full px-4 py-3.5 rounded-xl border border-dark/10 bg-white font-inter text-[14px] text-dark placeholder:text-dark/25 focus:outline-none focus:border-orange transition-colors"
                  />
                </div>
              </div>

              {/* Phone + Budget */}
              <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
                <div>
                  <label className="block font-inter text-[13px] font-medium text-dark/60 mb-2">
                    Téléphone <span className="text-dark/25 font-normal">(optionnel)</span>
                  </label>
                  <input
                    type="tel" value={form.phone} onChange={set('phone')}
                    placeholder="06 12 34 56 78"
                    className="w-full px-4 py-3.5 rounded-xl border border-dark/10 bg-white font-inter text-[14px] text-dark placeholder:text-dark/25 focus:outline-none focus:border-orange transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-inter text-[13px] font-medium text-dark/60 mb-2">
                    Budget envisagé <span className="text-dark/25 font-normal">(optionnel)</span>
                  </label>
                  <select
                    value={form.budget} onChange={set('budget')}
                    className="w-full px-4 py-3.5 rounded-xl border border-dark/10 bg-white font-inter text-[14px] text-dark focus:outline-none focus:border-orange transition-colors appearance-none"
                  >
                    <option value="">Sélectionner...</option>
                    {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block font-inter text-[13px] font-medium text-dark/60 mb-2">
                  Décrivez votre projet <span className="text-orange">*</span>
                </label>
                <textarea
                  required rows={5} value={form.message} onChange={set('message')}
                  placeholder="Mon activité, ce que j'attends du site, si j'ai des références qui m'inspirent..."
                  className="w-full px-4 py-3.5 rounded-xl border border-dark/10 bg-white font-inter text-[14px] text-dark placeholder:text-dark/25 focus:outline-none focus:border-orange transition-colors resize-none"
                />
              </div>

              {/* Submit */}
              <div className="flex items-center gap-6 pt-2">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="inline-flex items-center gap-2.5 font-syne font-bold text-[14px] px-8 py-4 rounded-xl bg-orange text-white hover:bg-orange-dk disabled:opacity-60 disabled:cursor-not-allowed transition-colors tracking-wide"
                >
                  {status === 'loading' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Envoi en cours...
                    </>
                  ) : 'Envoyer ma demande →'}
                </button>
                <p className="font-inter text-[12px] text-dark/35">
                  Réponse sous 24h · Sans engagement
                </p>
              </div>

              {status === 'error' && (
                <p className="font-inter text-[13px] text-red-500">
                  Une erreur s&apos;est produite. Écrivez-nous directement à hello@novupstudio.fr
                </p>
              )}

            </motion.form>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </>
  )
}
