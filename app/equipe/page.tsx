'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'

const team = [
  {
    name: 'Paul Bain',
    role: 'Co-fondateur · Design & Développement',
    bio: 'Paul conçoit et développe chaque site de A à Z. Du premier pixel à la mise en ligne, il s\'assure que le résultat soit soigné, rapide, et pensé pour convertir. Pas de sous-traitance, pas de template : chaque projet est fait sur-mesure.',
    tags: ['Design', 'Développement', 'Next.js'],
    photo: null,
  },
  {
    name: 'Romain Debard',
    role: 'Co-fondateur · Stratégie & Commercial',
    bio: 'Romain gère la relation client, la stratégie et le développement commercial. Son rôle : s\'assurer que chaque client se sente suivi et compris, du premier contact jusqu\'après la livraison.',
    tags: ['Stratégie', 'Commercial', 'Administratif'],
    photo: null,
  },
]

export default function EquipePage() {
  return (
    <>
      <Navbar />

      <main className="h-screen bg-bg flex flex-col justify-center px-16 gap-12 max-md:px-6 max-md:overflow-y-auto max-md:pt-24 max-md:pb-10 max-md:h-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="font-inter text-[11px] font-semibold tracking-[0.12em] uppercase text-orange mb-3 flex items-center gap-2.5">
            <span className="block w-6 h-px bg-orange" />
            L&apos;équipe
          </p>
          <h1
            className="font-syne font-black tracking-[-0.035em] leading-[1.0] text-dark"
            style={{ fontSize: 'clamp(28px, 3.8vw, 52px)' }}
          >
            Deux personnes.<br />Un vrai <em className="not-italic text-orange">engagement.</em>
          </h1>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              className="border border-dark/10 rounded-2xl overflow-hidden bg-white flex"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 + i * 0.12 }}
            >
              {/* Photo */}
              <div className="w-[140px] flex-shrink-0 bg-bg-warm relative">
                {member.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <div className="w-14 h-14 rounded-full bg-dark/8 flex items-center justify-center">
                      <span className="font-syne font-black text-[18px] text-dark/25">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="font-inter text-[9px] text-dark/20 tracking-widest uppercase text-center px-2">
                      Photo<br />à venir
                    </span>
                  </div>
                )}
                <div className="absolute top-0 left-0 bottom-0 w-1 bg-orange" />
              </div>

              {/* Content */}
              <div className="px-6 py-6 flex flex-col justify-between flex-1">
                <div>
                  <h2 className="font-syne font-black text-[18px] tracking-[-0.02em] text-dark mb-0.5">
                    {member.name}
                  </h2>
                  <p className="font-inter text-[11px] text-orange font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="font-inter text-[12.5px] text-dark/55 leading-[1.65]">
                    {member.bio}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {member.tags.map(tag => (
                    <span key={tag} className="font-inter text-[10px] font-medium text-dark/40 px-2.5 py-1 rounded-full border border-dark/10 bg-bg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA bas */}
        <motion.div
          className="flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <p className="font-inter text-[13px] text-dark/40">
            On répond à tous les messages dans la journée — c&apos;est nous directement, pas un commercial.
          </p>
          <a
            href="/devis"
            className="flex-shrink-0 font-syne font-bold text-[13px] px-6 py-3 rounded-xl bg-orange text-white hover:bg-orange-dk transition-colors tracking-wide"
          >
            Démarrer mon projet →
          </a>
        </motion.div>

      </main>
    </>
  )
}
