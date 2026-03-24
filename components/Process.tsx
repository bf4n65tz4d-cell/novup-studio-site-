'use client'

import { motion } from 'framer-motion'

const steps = [
  { n: '1', title: 'On discute',        desc: 'Un échange sans engagement pour cerner votre projet. On pose les bonnes questions, vous gardez le contrôle.' },
  { n: '2', title: 'On propose',        desc: 'Devis détaillé, délai précis, prix fixe. Vous savez exactement pour quoi vous signez. Pas de surprise.' },
  { n: '3', title: 'On crée',           desc: 'On travaille, vous validez. Retours illimités jusqu\'à ce que le résultat soit à la hauteur.' },
  { n: '4', title: 'On met en ligne',   desc: 'Mise en ligne, tests, domaine, hébergement : on gère tout. Zéro technique de votre côté.' },
  { n: '5', title: 'On reste là',       desc: 'Là où la plupart des agences s\'arrêtent, pas nous. On reste votre contact aussi longtemps que vous en avez besoin.' },
]

export default function Process() {
  return (
    <section
      id="process"
      className="px-16 py-24 border-t border-dark/10 bg-bg max-md:px-6 max-md:py-16"
    >
      <motion.h2
        className="font-syne font-black tracking-[-0.025em] leading-[1.1] text-dark mb-14"
        style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        Simple<br />de A à Z.
      </motion.h2>

      <div className="grid grid-cols-5 gap-8 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        {steps.map((step, i) => (
          <motion.div
            key={step.n}
            className="border-t-2 border-orange pt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.08 }}
          >
            <span className="font-syne font-black text-[52px] leading-none tracking-[-0.04em] text-dark opacity-[0.07] block mb-4">
              {step.n}
            </span>
            <div className="font-syne font-bold text-[16px] tracking-[-0.01em] text-dark mb-2">
              {step.title}
            </div>
            <div className="font-inter text-[12.5px] leading-relaxed text-dark/40">
              {step.desc}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
