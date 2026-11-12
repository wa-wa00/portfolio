import { useEffect, useRef } from 'react'

/**
 * Canvas dot grid (like a perfboard) — dots near the cursor grow and light up.
 * Theme-aware via the CSS --text color, and static when reduced motion is preferred.
 */
const SPACING = 26
const RADIUS = 140

const DotGrid = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 }
    let w = 0, h = 0, dpr = 1, raf = 0, color = '0,0,0'

    const readColor = () => {
      const c = getComputedStyle(document.documentElement).getPropertyValue('--text').trim()
      const m = c.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i)
      color = m ? m.slice(1).map((x) => parseInt(x, 16)).join(',') : '128,128,128'
    }

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw()
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (let y = SPACING / 2; y < h; y += SPACING) {
        for (let x = SPACING / 2; x < w; x += SPACING) {
          const d = Math.hypot(x - mouse.x, y - mouse.y)
          const t = Math.max(0, 1 - d / RADIUS)
          // fade out toward the bottom so the grid melts into the page
          const fade = Math.max(0, 1 - y / h) * 0.9 + 0.1
          const alpha = (0.1 + t * 0.6) * fade
          const r = 1 + t * 1.6
          ctx.fillStyle = `rgba(${color},${alpha})`
          ctx.beginPath()
          ctx.arc(x, y, r, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const loop = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.15
      mouse.y += (mouse.ty - mouse.y) * 0.15
      draw()
      if (Math.abs(mouse.tx - mouse.x) > 0.5 || Math.abs(mouse.ty - mouse.y) > 0.5) {
        raf = requestAnimationFrame(loop)
      } else {
        raf = 0
      }
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.tx = e.clientX - rect.left
      mouse.ty = e.clientY - rect.top
      if (mouse.x < -999) { mouse.x = mouse.tx; mouse.y = mouse.ty }
      if (reduce) { mouse.x = mouse.tx; mouse.y = mouse.ty; draw(); return }
      if (!raf) raf = requestAnimationFrame(loop)
    }

    const onLeave = () => {
      mouse.tx = mouse.ty = -9999
      mouse.x = mouse.y = -9999
      draw()
    }

    const scheme = window.matchMedia('(prefers-color-scheme: dark)')
    const onScheme = () => { readColor(); draw() }

    readColor()
    resize()
    const section = canvas.parentElement
    section.addEventListener('pointermove', onMove)
    section.addEventListener('pointerleave', onLeave)
    window.addEventListener('resize', resize)
    scheme.addEventListener('change', onScheme)

    return () => {
      cancelAnimationFrame(raf)
      section.removeEventListener('pointermove', onMove)
      section.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('resize', resize)
      scheme.removeEventListener('change', onScheme)
    }
  }, [])

  return <canvas ref={canvasRef} className="dot-grid" aria-hidden="true" />
}

export default DotGrid
