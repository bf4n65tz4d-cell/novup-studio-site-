'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 h-[68px] px-16 flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? 'bg-[#FFF7ED]/95 backdrop-blur-md border-b border-dark/10'
          : 'bg-dark-dk/90 backdrop-blur-md border-b border-white/8'
      }`}
    >
      <a href="/" className="flex-shrink-0 relative">
        <AnimatePresence mode="wait">
          {scrolled ? (
            <motion.img
              key="img"
              src="/logo-light.png"
              alt="NovUp Studio"
              className="h-20 w-auto object-contain"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <motion.span
              key="text"
              className="font-syne font-black text-[21px] tracking-tight text-white inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              Nov<span className="text-orange">Up</span> Studio
            </motion.span>
          )}
        </AnimatePresence>
      </a>

      <div className="flex items-center gap-9">
        <a href="/#services" className={`hidden md:block text-[13px] transition-colors font-inter ${scrolled ? 'text-dark/40 hover:text-dark' : 'text-white/50 hover:text-white'}`}>
          Services
        </a>
        <a href="/#process" className={`hidden md:block text-[13px] transition-colors font-inter ${scrolled ? 'text-dark/40 hover:text-dark' : 'text-white/50 hover:text-white'}`}>
          Process
        </a>
        <a href="/equipe" className={`hidden md:block text-[13px] transition-colors font-inter ${scrolled ? 'text-dark/40 hover:text-dark' : 'text-white/50 hover:text-white'}`}>
          L&apos;équipe
        </a>
        <a
          href="/devis"
          className={`font-syne font-bold text-[13px] px-5 py-2.5 rounded-md transition-colors tracking-wide ${scrolled ? 'bg-dark text-white hover:bg-black' : 'bg-white text-dark hover:bg-white/90'}`}
        >
          Devis gratuit
        </a>
      </div>
    </nav>
  )
}
