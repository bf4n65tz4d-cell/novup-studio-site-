'use client'

import { motion } from 'framer-motion'

export default function Cta() {
  return (
    <section
      id="contact"
      className="relative bg-dark-dk text-white py-36 px-16 text-center overflow-hidden max-md:py-24 max-md:px-6"
    >
      {/* Orange top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-orange" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <h2
          className="font-syne font-black tracking-[-0.035em] leading-[1.0] mb-6 text-white"
          style={{ fontSize: 'clamp(40px, 6vw, 84px)' }}
        >
          Votre projet<br />
          commence <em className="not-italic text-orange">ici.</em>
        </h2>

        <p className="font-inter text-[15px] text-white/45 leading-[1.7] mb-12">
          Un message suffit. On vous répond dans la journée —<br className="hidden md:block" />
          sans engagement, sans pression.
        </p>

        <a
          href="/devis"
          className="inline-flex items-center gap-2.5 font-syne font-bold text-[15px] px-10 py-[17px] rounded-lg bg-orange text-white border-2 border-orange hover:bg-transparent hover:text-orange transition-colors duration-200 tracking-wide"
        >
          Démarrer mon projet →
        </a>
      </motion.div>
    </section>
  )
}
