'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'

const tags = ['Design', 'Développement', 'React / Next.js', 'SEO', 'Tailwind CSS', 'Framer Motion', 'Next.js', 'UI/UX']

const stats = [
  { prefix: '< ', value: 48, suffix: 'h', label: 'Réactivité' },
  { prefix: '', value: 100, suffix: '%', label: 'Dispo' },
  { prefix: '', value: 2, suffix: ' jours', label: 'Livraison min' },
]

function CountUp({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1000
    const step = 16
    const increment = target / (duration / step)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, step)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

const ease = [0.16, 1, 0.3, 1] as const

export default function EquipePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-bg overflow-hidden relative flex items-center">

        {/* Gradient orange très léger */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.18) 0%, transparent 55%, rgba(249,115,22,0.12) 100%)' }}
        />

        {/* Dot grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(24,24,27,0.12) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Blobs */}
        <motion.div
          className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] rounded-full pointer-events-none blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.13) 0%, transparent 70%)' }}
          animate={{ x: [0, 20, -10, 0], y: [0, -15, 20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[-80px] left-[-80px] w-[500px] h-[500px] rounded-full pointer-events-none blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.10) 0%, transparent 70%)' }}
          animate={{ x: [0, -20, 15, 0], y: [0, 15, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none blur-3xl"
          style={{ background: 'radial-gradient(ellipse, rgba(249,115,22,0.04) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 w-full max-w-[1100px] mx-auto px-16 py-28 max-md:px-6 max-md:py-24">
          <div className="flex items-stretch gap-20 max-md:flex-col max-md:gap-10">

            {/* ── Photo ── */}
            <motion.div
              className="relative flex-shrink-0 w-[340px] max-md:w-full max-md:h-[320px]"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden min-h-[440px] max-md:min-h-0">
                <motion.img
                  src="/paul.jpeg"
                  alt="Paul Bain"
                  className="w-full h-full object-cover" style={{ objectPosition: '42% 25%' }}
                  initial={{ scale: 1.06 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2, ease }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/30 to-transparent" />
                <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-orange" />

                {/* Nom sur la photo en bas */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-syne font-black text-white text-[20px] tracking-[-0.02em] leading-tight">Paul Bain</p>
                  <p className="font-inter text-[11px] text-white/60 mt-0.5">Fondateur · NovUp Studio</p>
                </div>
              </div>

              {/* Carré déco */}
              <motion.div
                className="absolute -bottom-3 -right-3 w-12 h-12 rounded-xl border-2 border-orange/25"
                animate={{ rotate: [0, 6, -3, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>

            {/* ── Contenu ── */}
            <motion.div
              className="flex-1 min-w-0 flex flex-col justify-center gap-7"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } } }}
            >
              {/* Label */}
              <motion.p
                className="font-inter text-[11px] font-semibold tracking-[0.12em] uppercase text-orange flex items-center gap-2.5"
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
              >
                <span className="block w-6 h-px bg-orange" />
                L&apos;équipe
              </motion.p>

              {/* Titre */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
              >
                <h1
                  className="font-syne font-black tracking-[-0.035em] leading-[1.05] text-dark"
                  style={{ fontSize: 'clamp(30px, 3.8vw, 52px)' }}
                >
                  Une seule personne.<br />
                  Un vrai <em className="not-italic text-orange">engagement.</em>
                </h1>
              </motion.div>

              {/* Bio */}
              <motion.p
                className="font-inter text-[14px] text-dark/55 leading-[1.7]"
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
              >
                Je conçois et développe chaque site de A à Z, du brief initial à la mise en ligne.
                Pas de sous-traitance, pas de template : vous avez affaire à une seule personne, disponible,
                réactive, et impliquée dans votre projet du début à la fin.
              </motion.p>

              {/* Stats */}
              <motion.div
                className="flex gap-8 flex-wrap"
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
              >
                {stats.map((s) => (
                  <div key={s.label} className="flex flex-col">
                    <span className="font-syne font-black text-dark pb-1" style={{ fontSize: 'clamp(24px, 2.5vw, 36px)', lineHeight: 1.2 }}>
                      <CountUp target={s.value} prefix={s.prefix} suffix={s.suffix} />
                    </span>
                    <span className="font-inter text-[11px] text-dark/35 mt-1">{s.label}</span>
                  </div>
                ))}
              </motion.div>

              {/* Tags marquee */}
              <motion.div
                className="overflow-hidden"
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }}
              >
                <motion.div
                  className="flex gap-2.5 w-max"
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  {[...tags, ...tags].map((tag, i) => (
                    <span key={i} className="font-inter text-[11px] font-medium text-dark/40 px-3 py-1.5 rounded-full border border-dark/10 bg-bg-warm whitespace-nowrap">
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </motion.div>

              {/* CTA */}
              <motion.div
                className="flex items-center justify-between pt-5 border-t border-dark/10 max-md:flex-col max-md:items-start max-md:gap-4"
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }}
              >
                <p className="font-inter text-[12px] text-dark/35 max-w-[220px]">
                  Je réponds dans la journée. C&apos;est moi directement, pas un commercial.
                </p>
                <motion.a
                  href="/devis"
                  className="flex-shrink-0 font-syne font-bold text-[13px] px-6 py-3 rounded-xl bg-orange text-white tracking-wide"
                  whileHover={{ scale: 1.04, backgroundColor: '#EA580C' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                >
                  Démarrer mon projet →
                </motion.a>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </main>
    </>
  )
}
