import type { Metadata } from 'next'
import { Syne, Inter } from 'next/font/google'
import Cursor from '@/components/Cursor'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '600', '700', '800'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NovUp Studio ｜ Votre site, notre priorité.',
  description: 'Création de sites, entretien et référencement. Simple, efficace, toujours disponibles.',
  keywords: ['agence web', 'création site internet', 'référencement SEO', 'entretien site web'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${syne.variable} ${inter.variable} font-inter`} style={{ cursor: 'none' }}>
        <Cursor />
        {children}
      </body>
    </html>
  )
}
