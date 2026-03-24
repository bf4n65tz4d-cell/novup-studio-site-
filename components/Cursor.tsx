'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = window.innerWidth  / 2
    let my = window.innerHeight / 2
    let dx = mx, dy = my
    let rx = mx, ry = my
    let hovered = false
    let raf: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      // Dot snaps directly to mouse — no lag
      dot.style.left = `${mx}px`
      dot.style.top  = `${my}px`
    }

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n

    const tick = () => {
      // Only ring has lerp lag
      rx = lerp(rx, mx, 0.12)
      ry = lerp(ry, my, 0.12)

      ring.style.left = `${rx}px`
      ring.style.top  = `${ry}px`

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const addHover = () => {
      hovered = true
      dot.classList.add('expanded')
      ring.classList.add('expanded')
    }
    const removeHover = () => {
      hovered = false
      dot.classList.remove('expanded')
      ring.classList.remove('expanded')
    }

    const attachHovers = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', addHover)
        el.addEventListener('mouseleave', removeHover)
      })
    }
    attachHovers()

    // Re-attach if DOM changes (Next.js navigation)
    const observer = new MutationObserver(attachHovers)
    observer.observe(document.body, { childList: true, subtree: true })

    window.addEventListener('mousemove', onMove)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: '50%',
          background: '#F97316',
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate(-50%,-50%)',
          transition: 'width .15s, height .15s',
          mixBlendMode: 'normal',
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 36, height: 36,
          borderRadius: '50%',
          border: '1.5px solid rgba(249,115,22,0.55)',
          background: 'transparent',
          pointerEvents: 'none',
          zIndex: 99998,
          transform: 'translate(-50%,-50%)',
          transition: 'width .2s ease, height .2s ease, border-color .2s ease',
        }}
      />
      <style>{`
        @media (max-width: 768px) {
          .cursor-dot, .cursor-ring { display: none !important; }
          body { cursor: auto !important; }
        }
        .cursor-dot.expanded  { width: 12px !important; height: 12px !important; }
        .cursor-ring.expanded {
          width: 54px !important;
          height: 54px !important;
          border-color: #F97316 !important;
        }
      `}</style>
    </>
  )
}
