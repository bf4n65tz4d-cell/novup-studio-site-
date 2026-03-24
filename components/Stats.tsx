'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 48,   suffix: 'h',  label: 'Réponse garantie',           desc: 'On ne vous laisse jamais sans nouvelles.' },
  { value: 100,  suffix: '%',  label: 'Clients suivis après livraison', desc: 'La relation ne s\'arrête pas à la mise en ligne.' },
  { value: 3,    suffix: '+',  label: 'Sites livrés',                desc: 'Pour des indépendants, TPE et PME.' },
]

function Counter({ value, suffix, active }: { value: number; suffix: string; active: boolean }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!active) return
    let start = 0
    const duration = 1400
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      start = Math.round(eased * value)
      setDisplay(start)
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [active, value])

  return (
    <span className="inline-flex items-center">
      <span>{display}</span>
      {suffix && <span style={{ lineHeight: 1 }}>{suffix}</span>}
    </span>
  )
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <section
      ref={ref}
      className="px-16 py-24 border-t border-dark/10 bg-bg max-md:px-6 max-md:py-16"
    >
      <div className="grid grid-cols-3 gap-0 max-md:grid-cols-1">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className={`py-10 px-8 flex flex-col items-center text-center gap-3 max-md:px-0 max-md:py-8 ${
              i < stats.length - 1 ? 'border-r border-dark/10 max-md:border-r-0 max-md:border-b' : ''
            }`}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: i * 0.12 }}
          >
            <div
              className="font-syne font-black tracking-[-0.04em] leading-none text-dark"
              style={{ fontSize: 'clamp(56px, 7vw, 96px)' }}
            >
              <Counter value={s.value} suffix={s.suffix} active={isInView} />
            </div>
            <div className="font-syne font-bold text-[14px] text-dark tracking-[-0.01em]">
              {s.label}
            </div>
            <div className="font-inter text-[13px] text-dark/38 leading-relaxed max-w-[200px]">
              {s.desc}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
