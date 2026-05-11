'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

const steps = [
  { n: '1', title: 'On discute',        desc: 'Un échange sans engagement pour cerner votre projet. On pose les bonnes questions, vous gardez le contrôle.' },
  { n: '2', title: 'On propose',        desc: 'Devis détaillé, délai précis, prix fixe. Vous savez exactement pour quoi vous signez. Pas de surprise.' },
  { n: '3', title: 'On crée',           desc: 'On travaille, vous validez. Retours illimités jusqu\'à ce que le résultat soit à la hauteur.' },
  { n: '4', title: 'On met en ligne',   desc: 'Mise en ligne, tests, domaine, hébergement : on gère tout. Zéro technique de votre côté.' },
  { n: '5', title: 'On reste là',       desc: 'Là où la plupart des agences s\'arrêtent, pas nous. On reste votre contact aussi longtemps que vous en avez besoin.' },
]

function Step({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const isLeft = index % 2 === 0

  return (
    <div ref={ref} className="relative grid grid-cols-[1fr_56px_1fr] items-center gap-0 max-md:grid-cols-[56px_1fr]">

      {/* Contenu gauche (desktop uniquement, index pair) */}
      <motion.div
        className={`pr-10 max-md:hidden ${isLeft ? '' : 'opacity-0 pointer-events-none'}`}
        initial={{ opacity: 0, x: -28 }}
        animate={isInView && isLeft ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {isLeft && <StepCard step={step} align="right" />}
      </motion.div>

      {/* Colonne centrale : cercle numéroté */}
      <div className="flex flex-col items-center z-10 max-md:col-start-1">
        <motion.div
          className="w-14 h-14 rounded-full bg-orange flex items-center justify-center flex-shrink-0 shadow-[0_0_0_6px_rgba(249,115,22,0.15)]"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
        >
          <span className="font-syne font-black text-white text-[20px] leading-none">{step.n}</span>
        </motion.div>
      </div>

      {/* Contenu droite */}
      <motion.div
        className={`pl-10 max-md:pl-6 ${!isLeft ? '' : 'max-md:block hidden'}`}
        initial={{ opacity: 0, x: 28 }}
        animate={isInView && (!isLeft || true) ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.05 }}
      >
        {/* Desktop : affiché uniquement si index impair */}
        <div className={`max-md:block ${!isLeft ? 'block' : 'hidden'}`}>
          <StepCard step={step} align="left" />
        </div>
        {/* Mobile : toujours à droite */}
        <div className={`md:hidden ${isLeft ? 'block' : 'hidden'}`}>
          <StepCard step={step} align="left" />
        </div>
      </motion.div>
    </div>
  )
}

function StepCard({ step, align }: { step: typeof steps[0]; align: 'left' | 'right' }) {
  return (
    <div className={`rounded-2xl border border-dark/8 bg-white/60 px-6 py-5 shadow-[0_2px_16px_rgba(0,0,0,0.04)] ${align === 'right' ? 'text-right' : 'text-left'}`}>
      <div className={`flex items-center gap-2 mb-3 ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
        <span className="font-inter text-[10px] font-semibold tracking-[0.12em] uppercase text-orange">
          Étape {step.n}
        </span>
      </div>
      <div className="font-syne font-bold text-[19px] tracking-[-0.02em] text-dark mb-2 leading-tight">
        {step.title}
      </div>
      <div className="font-inter text-[13.5px] leading-relaxed text-dark/50">
        {step.desc}
      </div>
    </div>
  )
}

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.6'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      id="process"
      ref={sectionRef}
      className="px-16 py-24 border-t border-dark/10 bg-bg max-md:px-6 max-md:py-14"
    >
      <motion.h2
        className="font-syne font-black tracking-[-0.025em] leading-[1.1] text-dark mb-20 max-md:mb-12"
        style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        Simple<br />de A à Z.
      </motion.h2>

      {/* Timeline */}
      <div className="relative max-w-2xl mx-auto">

        {/* Ligne de fond (grise) */}
        <div className="absolute left-1/2 -translate-x-px top-7 bottom-7 w-px bg-dark/10 max-md:left-7" />

        {/* Ligne de progression (orange) */}
        <div
          ref={lineRef}
          className="absolute left-1/2 -translate-x-px top-7 bottom-7 w-px overflow-hidden max-md:left-7"
        >
          <motion.div
            className="w-full bg-orange origin-top"
            style={{ height: lineHeight }}
          />
        </div>

        {/* Étapes */}
        <div className="flex flex-col gap-16 max-md:gap-12">
          {steps.map((step, i) => (
            <Step key={step.n} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
