'use client'

import { motion } from 'framer-motion'

const words = ["L'agence", 'qui', 'ne', 'vous', 'lâche', 'pas.']
const orangeWords = ['lâche', 'pas.']

const chars = ['Réactifs', '·', 'Disponibles', '·', 'Engagés']

export default function Statement() {
  return (
    <section className="px-16 py-16 border-t border-dark/10 text-center bg-bg max-md:px-6 max-md:py-8">

      {/* Word-by-word reveal */}
      <motion.p
        className="font-syne font-black tracking-[-0.03em] leading-[1.05] max-w-[1100px] mx-auto mb-12 text-dark flex flex-wrap justify-center gap-x-[0.28em] gap-y-0"
        style={{ fontSize: 'clamp(26px, 5.5vw, 74px)' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      >
        {words.map((word, i) => (
          <span key={i} className="overflow-hidden inline-block">
            <motion.span
              className={`inline-block ${orangeWords.includes(word) ? 'text-orange' : ''}`}
              variants={{
                hidden:  { y: '110%', opacity: 0 },
                visible: { y: '0%', opacity: 1, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.p>

      {/* Animated separator line */}
      <motion.div
        className="w-12 h-px bg-orange mx-auto mb-8"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
        style={{ transformOrigin: 'center' }}
      />

      {/* Staggered traits */}
      <motion.div
        className="flex items-center justify-center gap-4 font-inter text-[13px] font-medium text-dark/38 tracking-[0.04em]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08, delayChildren: 0.6 } },
        }}
      >
        {chars.map((c, i) => (
          <motion.span
            key={i}
            className={c === '·' ? 'text-orange text-[10px]' : ''}
            variants={{
              hidden:  { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
            }}
          >
            {c}
          </motion.span>
        ))}
      </motion.div>
    </section>
  )
}
