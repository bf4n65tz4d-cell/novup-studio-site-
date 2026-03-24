export default function Footer() {
  return (
    <footer className="bg-bg border-t border-dark/10 px-16 py-8 flex items-center justify-between max-md:flex-col max-md:gap-3 max-md:text-center max-md:px-6 max-md:py-7">
      <div className="font-syne font-black text-[14px] text-dark/40">
        Nov<span className="text-orange">Up</span> Studio
      </div>
      <div className="font-inter text-[12px] text-dark/35">
        © 2025 NovUp Studio · Tous droits réservés
      </div>
      <div className="font-inter text-[12px] text-dark/35 flex items-center gap-1">
        Fait avec <span className="text-orange">♥</span> et passion
      </div>
    </footer>
  )
}
