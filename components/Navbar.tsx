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
      className={`fixed inset-x-0 top-0 z-50 h-[68px] px-16 max-md:px-5 flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? 'bg-[#FFF7ED]/95 backdrop-blur-md border-b border-dark/10'
          : 'bg-dark-dk/90 backdrop-blur-md border-b border-white/8'
      }`}
    >
      <a href="/" className="flex-shrink-0 flex items-center gap-3">
        <svg width="36" height="36" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
          <rect width="80" height="80" rx="18" fill="#100D0A"/>
          <rect x="16" y="16" width="10" height="48" fill="#FFF7ED"/>
          <polygon points="16,16 26,16 54,62 54,64 44,64 16,18" fill="#FFF7ED"/>
          <rect x="44" y="16" width="10" height="48" fill="#FFF7ED"/>
          <polygon points="26,16 36,16 44,30 34,30" fill="#F97316"/>
        </svg>
        <span className={`font-syne font-black text-[19px] tracking-tight transition-colors ${scrolled ? 'text-dark' : 'text-white'}`}>
          Nov<span className="text-orange">Up</span> Studio
        </span>
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
          className={`font-syne font-bold text-[13px] px-5 py-2.5 max-md:px-4 max-md:py-2 rounded-md transition-colors tracking-wide whitespace-nowrap ${scrolled ? 'bg-dark text-white hover:bg-black' : 'bg-white text-dark hover:bg-white/90'}`}
        >
          Devis gratuit
        </a>
      </div>
    </nav>
  )
}
