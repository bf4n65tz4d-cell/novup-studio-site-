'use client'

import { useRef } from 'react'
import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, MotionValue } from 'framer-motion'

const titleWords = ['Trois', 'services.', '\n', 'Un', 'seul', 'interlocuteur.']

function Word({ word, progress, start, end }: {
  word: string
  progress: MotionValue<number>
  start: number
  end: number
}) {
  const color = useTransform(progress, [start, end], ['#18181B', '#F97316'])
  return <motion.span style={{ color }}>{word}</motion.span>
}

const services = [
  {
    num: '01',
    name: 'Création & Refonte',
    desc: 'Un site à votre image, livré dans les temps. Design soigné, rapide, validé ensemble — sans mauvaise surprise.',
    details: {
      tagline: 'Votre site, de zéro à en ligne.',
      points: [
        'Design sur-mesure, validé étape par étape avec vous',
        'Développement Next.js — rapide, moderne, optimisé',
        'Responsive mobile inclus, testé sur tous les écrans',
        'Nom de domaine, hébergement et mise en ligne gérés',
        'Retours illimités jusqu\'à satisfaction complète',
      ],
      meta: [
        { label: 'Délai', value: '2 – 4 semaines' },
        { label: 'À partir de', value: '800 €' },
        { label: 'Engagement', value: 'Aucun' },
      ],
    },
  },
  {
    num: '02',
    name: 'Entretien & Suivi',
    desc: 'Textes, photos, bugs, performances — on gère. Vous n\'avez plus à y penser.',
    details: {
      tagline: 'Votre site toujours à jour, sans effort.',
      points: [
        'Modifications de contenu sous 48h (textes, images, prix…)',
        'Corrections de bugs et problèmes techniques',
        'Optimisation des performances et temps de chargement',
        'Un interlocuteur dédié, joignable par message',
        'Rapport mensuel simple sur l\'état de votre site',
      ],
      meta: [
        { label: 'Engagement', value: 'Mensuel' },
        { label: 'À partir de', value: '90 € / mois' },
        { label: 'Réactivité', value: '< 48h' },
      ],
    },
  },
  {
    num: '03',
    name: 'Référencement SEO',
    desc: 'Vos clients vous cherchent. On fait en sorte qu\'ils vous trouvent — sans promesses vides.',
    details: {
      tagline: 'Être trouvé sur Google, naturellement.',
      points: [
        'Audit SEO complet de votre site existant',
        'Optimisation on-page : titres, metas, structure, vitesse',
        'Recherche de mots-clés adaptés à votre activité',
        'Création de contenu optimisé pour votre secteur',
        'Suivi mensuel des positions et rapport transparent',
      ],
      meta: [
        { label: 'Résultats', value: '3 – 6 mois' },
        { label: 'À partir de', value: '200 € / mois' },
        { label: 'Reporting', value: 'Mensuel' },
      ],
    },
  },
]

export default function Services() {
  const [openId, setOpenId] = useState<string | null>(null)
  const opened = services.find(s => s.num === openId) ?? null
  const titleRef = useRef<HTMLHeadingElement>(null)
  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ['start 0.85', 'end 0.4'],
  })
  const words = titleWords.filter(w => w !== '\n')
  const total = words.length

  return (
    <section id="services" className="px-16 pt-24 pb-20 border-t border-dark/10 bg-bg max-md:px-6">
      <h2
        ref={titleRef}
        className="font-syne font-black tracking-[-0.025em] mb-12 leading-tight"
        style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
      >
        {(() => {
          let wordIdx = 0
          return titleWords.map((word, i) => {
            if (word === '\n') return <br key={i} />
            const idx = wordIdx++
            return (
              <span key={i}>
                <Word word={word} progress={scrollYProgress} start={idx / total} end={(idx + 1) / total} />{' '}
              </span>
            )
          })
        })()}
      </h2>

      <div className="border-t border-dark/10">
        {services.map((svc, i) => (
          <motion.div
            key={svc.num}
            className="group flex items-center gap-0 py-7 border-b border-dark/10 relative overflow-hidden cursor-pointer hover:bg-bg-warm transition-colors duration-250"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }}
            onClick={() => setOpenId(svc.num)}
          >
            <div className="absolute bottom-[-1px] left-0 h-px w-full bg-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

            <span className="font-inter text-[11px] font-medium text-dark/35 tracking-widest min-w-[56px]">
              {svc.num}
            </span>

            <span
              className="font-syne font-bold tracking-[-0.015em] text-dark flex-1"
              style={{ fontSize: 'clamp(22px, 2.8vw, 34px)' }}
            >
              {svc.name}
            </span>

            <span className="hidden md:block font-inter text-[13px] text-dark/38 leading-relaxed max-w-[300px] flex-none px-10">
              {svc.desc}
            </span>

            <span className="text-xl text-orange transition-transform duration-300 group-hover:translate-x-1.5 min-w-[32px] text-right">
              →
            </span>
          </motion.div>
        ))}
      </div>

      {/* ── Backdrop + Modal ── */}
      <AnimatePresence>
        {opened && (
          <>
            {/* Backdrop blur */}
            <motion.div
              className="fixed inset-0 z-40 bg-dark/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpenId(null)}
            />

            {/* Modal */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpenId(null)}
            >
              <motion.div
                className="relative bg-bg w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
                onClick={e => e.stopPropagation()}
                initial={{ scale: 0.94, y: 24 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.94, y: 24 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Orange top bar */}
                <div className="h-1 w-full bg-orange" />

                <div className="px-10 py-10 max-md:px-6 max-md:py-8">

                  {/* Header */}
                  <div className="flex items-start justify-between mb-8 gap-4">
                    <div>
                      <span className="font-inter text-[11px] font-medium text-dark/35 tracking-widest block mb-2">
                        {opened.num}
                      </span>
                      <h3
                        className="font-syne font-black tracking-[-0.025em] text-dark leading-tight"
                        style={{ fontSize: 'clamp(26px, 3.5vw, 42px)' }}
                      >
                        {opened.name}
                      </h3>
                      <p className="font-inter text-[14px] text-orange font-medium mt-2">
                        {opened.details.tagline}
                      </p>
                    </div>
                    <button
                      onClick={() => setOpenId(null)}
                      className="w-9 h-9 rounded-full border border-dark/15 flex items-center justify-center text-dark/40 hover:text-dark hover:border-dark/30 transition-colors flex-shrink-0 text-lg"
                    >
                      ×
                    </button>
                  </div>

                  {/* Points */}
                  <ul className="space-y-3 mb-8">
                    {opened.details.points.map((point, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3 font-inter text-[14px] text-dark/70 leading-relaxed"
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.15 + i * 0.06 }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-orange flex-shrink-0 mt-[7px]" />
                        {point}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Meta + CTA */}
                  <div className="flex items-end justify-between gap-6 pt-6 border-t border-dark/10 max-md:flex-col max-md:items-start">
                    <div className="flex gap-6 flex-wrap">
                      {opened.details.meta.map(m => (
                        <div key={m.label}>
                          <p className="font-inter text-[11px] text-dark/35 mb-0.5">{m.label}</p>
                          <p className="font-syne font-bold text-[14px] text-dark">{m.value}</p>
                        </div>
                      ))}
                    </div>
                    <a
                      href="/devis"
                      className="font-syne font-bold text-[13px] px-6 py-3 rounded-lg bg-orange text-white hover:bg-orange-dk transition-colors tracking-wide whitespace-nowrap flex-shrink-0"
                    >
                      Demander un devis →
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
