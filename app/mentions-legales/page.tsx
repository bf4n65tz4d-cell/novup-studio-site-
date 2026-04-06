'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const ease = [0.16, 1, 0.3, 1] as const

const sections = [
  {
    title: 'Éditeur du site',
    content: [
      'Paul Bain ｜ Entrepreneur Individuel (EI)',
      '9 rue Ernest Deconynck, 59800 Lille, France',
      'SIREN : 102 893 435',
      'SIRET : 102 893 435 00010',
      'Code APE : 62.01Z',
      'Immatriculé le 25/03/2026',
      'TVA non applicable ｜ art. 293 B du CGI',
      'Nom commercial : NovUp Studio',
    ],
  },
  {
    title: 'Hébergeur',
    content: [
      'Vercel Inc.',
      '340 Pine Street, Suite 701',
      'San Francisco, CA 94104, États-Unis',
      'Site : vercel.com',
    ],
  },
  {
    title: 'Propriété intellectuelle',
    content: [
      'L\'ensemble du contenu de ce site (textes, visuels, code, structure) est la propriété exclusive de Paul Bain / NovUp Studio. Toute reproduction, même partielle, est interdite sans autorisation préalable écrite.',
    ],
  },
  {
    title: 'Données personnelles',
    content: [
      'Ce site collecte des données personnelles via le formulaire de demande de devis (nom, prénom, email, téléphone, description du projet). Ces données sont utilisées uniquement pour répondre à votre demande et ne sont pas transmises à des tiers.',
      'Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d\'un droit d\'accès, de rectification et de suppression de vos données. Pour exercer ce droit, contactez : paulbain@novupstudio.com',
    ],
  },
  {
    title: 'Cookies',
    content: [
      'Ce site n\'utilise pas de cookies de tracking ou de publicité. Aucune donnée de navigation n\'est collectée à des fins statistiques ou commerciales.',
    ],
  },
  {
    title: 'Responsabilité',
    content: [
      'NovUp Studio s\'efforce de maintenir les informations de ce site à jour et exactes. Toutefois, la responsabilité de l\'éditeur ne saurait être engagée en cas d\'inexactitude ou d\'omission.',
    ],
  },
]

export default function MentionsLegalesPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-bg relative overflow-hidden">

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(24,24,27,0.10) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Gradient orange */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.08) 0%, transparent 50%)' }}
        />

        <div className="relative z-10 w-full max-w-[760px] mx-auto px-16 py-32 max-md:px-6 max-md:py-24">

          {/* Header */}
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="font-inter text-[11px] font-semibold tracking-[0.12em] uppercase text-orange flex items-center gap-2.5 mb-5">
              <span className="block w-6 h-px bg-orange" />
              Informations légales
            </p>
            <h1
              className="font-syne font-black tracking-[-0.035em] leading-[1.05] text-dark"
              style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }}
            >
              Mentions <span className="text-orange">légales</span>
            </h1>
            <p className="font-inter text-[13px] text-dark/40 mt-4">
              Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique (LCEN).
            </p>
          </motion.div>

          {/* Sections */}
          <div className="flex flex-col gap-10">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease, delay: 0.1 + i * 0.07 }}
                className="border-t border-dark/10 pt-8"
              >
                <h2 className="font-syne font-bold text-[15px] text-dark tracking-[-0.01em] mb-4">
                  {section.title}
                </h2>
                <div className="flex flex-col gap-2">
                  {section.content.map((line, j) => (
                    <p key={j} className="font-inter text-[13px] text-dark/55 leading-[1.7]">
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Last updated */}
          <motion.p
            className="font-inter text-[11px] text-dark/25 mt-14 border-t border-dark/8 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Dernière mise à jour : mars 2026
          </motion.p>
        </div>
      </main>

      <Footer />
    </>
  )
}
