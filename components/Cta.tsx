'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

export default function Cta() {
  const rotateY = useMotionValue(0)
  const rotateX = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 80, damping: 20 })
  const springY = useSpring(rotateY, { stiffness: 80, damping: 20 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      rotateY.set(((e.clientX - cx) / cx) * 6)
      rotateX.set(-((e.clientY - cy) / cy) * 4)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [rotateX, rotateY])

  return (
    <section
      id="contact"
      className="relative bg-dark-dk text-white py-36 px-16 text-center overflow-hidden max-md:py-16 max-md:px-6"
    >
      {/* Orange top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-orange" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div style={{ perspective: 1200 }}>
          <motion.h2
            className="font-syne font-black tracking-[-0.035em] leading-[1.0] mb-6 text-white"
            style={{ fontSize: 'clamp(28px, 6vw, 84px)', rotateY: springY, rotateX: springX }}
          >
            Votre projet<br />
            commence <em className="not-italic text-orange">ici.</em>
          </motion.h2>
        </div>

        <p className="font-inter text-[15px] text-white/45 leading-[1.7] mb-12">
          Un message suffit. On vous répond dans la journée, sans engagement, sans pression.
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
