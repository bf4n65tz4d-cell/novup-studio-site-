'use client'

import { motion } from 'framer-motion'

const steps = [
  { n: '1', title: 'On discute',        desc: 'Un échange sans engagement pour cerner votre projet et vos besoins. On pose les bonnes questions, vous gardez le contrôle.' },
  { n: '2', title: 'On propose',        desc: 'Devis détaillé, délai précis, prix fixe. Vous savez exactement pour quoi vous signez — pas de mauvaise surprise.' },
  { n: '3', title: 'On crée',           desc: 'On travaille, vous validez. Retours illimités jusqu\'à ce que le résultat soit à la hauteur.' },
  { n: '4', title: 'On met en ligne',   desc: 'Mise en ligne, tests, domaine, hébergement — on gère tout. Zéro technique de votre côté.' },
  { n: '5', title: 'On reste là',       desc: 'C\'est là que la plupart des agences s\'arrêtent. Pas nous. On reste votre contact, aussi longtemps que vous en avez besoin.' },
]

export default function Process() {
  return (
    <section
      id="process"
      className="px-16 py-24 border-t border-dark/10 grid grid-cols-[1fr_1.6fr] gap-20 items-start bg-bg max-md:grid-cols-1 max-md:gap-10 max-md:px-6 max-md:py-16"
    >
      {/* Left — sticky title */}
      <motion.h2
        className="font-syne font-black tracking-[-0.025em] leading-[1.1] text-dark md:sticky md:top-24"
        style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        Simple<br />de A<br />à Z.
      </motion.h2>

      {/* Right — steps with timeline */}
      <div className="relative border-t border-dark/10">

        {/* Animated vertical line */}
        <motion.div
          className="absolute left-[39px] top-0 w-px bg-orange origin-top max-md:left-[27px]"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{ height: '100%' }}
        />

        {steps.map((step, i) => (
          <motion.div
            key={step.n}
            className="grid grid-cols-[80px_1fr] gap-6 py-8 border-b border-dark/10 items-start relative"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }}
          >
            {/* Animated dot on the line */}
            <motion.div
              className="absolute left-[31px] w-[17px] h-[17px] rounded-full border-2 border-orange bg-bg max-md:left-[19px]"
              style={{ top: '38px' }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: 0.4 + i * 0.1 }}
            />

            <span className="font-syne font-black text-[72px] leading-none tracking-[-0.04em] text-dark opacity-[0.07] mt-[-8px] w-full text-center block">
              {step.n}
            </span>
            <div>
              <div className="font-syne font-bold text-[17px] tracking-[-0.01em] text-dark mb-2">
                {step.title}
              </div>
              <div className="font-inter text-[13px] leading-relaxed text-dark/38">
                {step.desc}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
