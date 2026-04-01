'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'

/* ── Text reveal animation ─────────────────────────────────── */
const maskVariants = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: (i: number) => ({
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.12 },
  }),
}

const lines = ['VOTRE SITE', 'WEB, SANS', 'PRISE DE', 'TÊTE.']

/* ── Rotating badge ─────────────────────────────────────────── */
const BADGE_TEXT = 'AGENCE WEB · SITES MODERNES · RÉSULTATS ·'

export default function Hero() {
  const badgeRef = useRef<HTMLDivElement>(null)
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
    <section className="min-h-svh max-md:min-h-0 flex flex-col justify-between relative overflow-hidden bg-dark-dk pt-[120px] pb-20 px-16 max-md:px-6 max-md:pt-20 max-md:pb-10">

      {/* ── Dot grid ────────────────────────────────────────── */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(249,115,22,0.22) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      {/* ── Animated orange glow blobs ─────────────────────── */}
      <motion.div
        className="pointer-events-none absolute"
        style={{ top: '-10%', left: '-5%', width: '55vw', height: '55vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 65%)' }}
        animate={{ x: [0, 30, -20, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute"
        style={{ bottom: '5%', right: '-10%', width: '40vw', height: '40vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.10) 0%, transparent 65%)' }}
        animate={{ x: [0, -25, 15, 0], y: [0, 20, -25, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      {/* ── Rotating badge (top right) ─────────────────────── */}
      <div className="absolute top-[130px] right-16 max-md:hidden">
        <motion.div
          ref={badgeRef}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ width: 110, height: 110 }}
        >
          <svg viewBox="0 0 110 110" width="110" height="110">
            <defs>
              <path id="circle-path" d="M 55,55 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
            </defs>
            <text fill="#F97316" fontSize="10.5" fontFamily="Syne, sans-serif" fontWeight="600" letterSpacing="2.2">
              <textPath href="#circle-path">{BADGE_TEXT}</textPath>
            </text>
          </svg>
        </motion.div>
        {/* Center dot */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-orange" />
        </motion.div>
      </div>

      {/* ── Headline ───────────────────────────────────────── */}
      {/* Wrapper plain div for 3D tilt (avoids Framer Motion overriding CSS transforms) */}
      <div style={{ perspective: 1200 }}>
        <motion.div
          style={{ rotateY: springY, rotateX: springX, fontSize: 'clamp(34px, 7.8vw, 112px)' }}
          className="font-syne font-black leading-[0.94] tracking-[-0.04em] text-white"
        >
          {lines.map((line, i) => (
            <div key={i} className="overflow-hidden pt-[0.12em] pb-[0.03em] mt-[-0.12em]">
              <motion.div
                className={`block ${i === 3 ? 'text-orange' : ''}`}
                variants={maskVariants}
                initial="hidden"
                animate="visible"
                custom={i}
              >
                {line}
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Bottom row ─────────────────────────────────────── */}
      <motion.div
        className="flex items-end justify-between gap-10 max-md:flex-col max-md:items-start"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 1.1 }}
      >
        <div>
          <p className="font-inter text-[15px] leading-[1.7] text-white/65 max-w-[360px] mb-6">
            Un seul interlocuteur pour créer, entretenir<br />et faire grandir votre présence en ligne.
          </p>
          <motion.a
            href="/devis"
            className="inline-flex items-center gap-2 font-syne font-bold text-sm px-7 py-3.5 rounded-lg bg-orange text-white tracking-wide"
            whileHover={{ scale: 1.07, backgroundColor: '#EA580C', boxShadow: '0 8px 28px rgba(249,115,22,0.45)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
          >
            Démarrer mon projet →
          </motion.a>
        </div>

        <div className="text-right max-md:hidden flex flex-col gap-4">
          <div>
            <p className="font-syne font-black text-[28px] leading-none tracking-[-0.03em] text-white">48h</p>
            <p className="font-inter text-[12px] text-white/50 mt-1">réponse garantie</p>
          </div>
          <div>
            <p className="font-syne font-black text-[28px] leading-none tracking-[-0.03em] text-white">100%</p>
            <p className="font-inter text-[12px] text-white/50 mt-1">clients suivis après livraison</p>
          </div>
        </div>
      </motion.div>

      {/* ── Orange bottom line ─────────────────────────────── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-orange"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 1.4 }}
        style={{ transformOrigin: 'left' }}
      />


    </section>
  )
}
