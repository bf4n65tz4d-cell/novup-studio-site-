import Navbar    from '@/components/Navbar'
import Hero      from '@/components/Hero'
import Services  from '@/components/Services'
import Stats     from '@/components/Stats'
import Statement from '@/components/Statement'
import Process   from '@/components/Process'
import Cta       from '@/components/Cta'
import Footer    from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Stats />
      <Statement />
      <Process />
      <Cta />
      <Footer />
    </main>
  )
}
