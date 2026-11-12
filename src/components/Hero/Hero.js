import { useState, useEffect } from 'react'
import DotGrid from './DotGrid'
import './Hero.css'

const ROLES = [
  'Embedded & IoT Engineer',
  'Edge AI & Computer Vision',
  'Backend Developer',
  'Hardware-Software Integrator',
]
const GLYPHS = '01<>/_#*+=-'
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Decode-style text swap: letters resolve left-to-right out of random glyphs. */
const useScramble = (words, hold = 2600) => {
  const [text, setText] = useState(words[0])

  useEffect(() => {
    let idx = 0, frame = 0, raf = 0, timer = 0

    const next = () => {
      const from = words[idx]
      idx = (idx + 1) % words.length
      const to = words[idx]
      // Reduced motion: plain swap, no scramble
      if (reduceMotion()) {
        setText(to)
        timer = setTimeout(next, hold)
        return
      }
      const len = Math.max(from.length, to.length)
      frame = 0
      const step = () => {
        frame++
        let out = ''
        for (let i = 0; i < len; i++) {
          const settle = i * 1.2 + 6
          if (frame >= settle) out += to[i] || ''
          else if (frame >= settle - 8) out += to[i] === ' ' ? ' ' : GLYPHS[(Math.random() * GLYPHS.length) | 0]
          else out += from[i] || ''
        }
        setText(out)
        if (frame < len * 1.2 + 6) raf = requestAnimationFrame(step)
        else timer = setTimeout(next, hold)
      }
      raf = requestAnimationFrame(step)
    }

    timer = setTimeout(next, hold)
    return () => { clearTimeout(timer); cancelAnimationFrame(raf) }
  }, [words, hold])

  return text
}

/** Animate a number from 0 to target. */
const useCountUp = (target, duration = 1200) => {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!target) return
    if (reduceMotion()) { setN(target); return }
    let raf = 0
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return n
}

const bangkokTime = () =>
  new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Bangkok', hour: '2-digit', minute: '2-digit' })

const Hero = () => {
  const [stats, setStats] = useState({ projectsCount: 0, skillsCount: 0 })
  const [time, setTime] = useState(bangkokTime)
  const role = useScramble(ROLES)
  const years = useCountUp(3)
  const projects = useCountUp(stats.projectsCount)
  const skills = useCountUp(stats.skillsCount)

  // ดึงจำนวนจริงจาก Database (Projects & Skills)
  useEffect(() => {
    Promise.all([
      fetch('/api/projects').then(r => r.json()).catch(() => []),
      fetch('/api/skills').then(r => r.json()).catch(() => [])
    ]).then(([projects, skills]) => {
      setStats({
        projectsCount: Array.isArray(projects) ? projects.length : 0,
        skillsCount: Array.isArray(skills) ? skills.length : 0
      })
    })
  }, [])

  useEffect(() => {
    const id = setInterval(() => setTime(bangkokTime()), 15000)
    return () => clearInterval(id)
  }, [])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className="hero">
      <DotGrid />
      <div className="container hero-inner">
        <p className="hero-status rise" style={{ '--d': '0ms' }}>
          <span className="status-dot" /> Available for opportunities
          <span className="hero-time">· Bangkok {time}</span>
        </p>

        <h1 className="hero-title rise" style={{ '--d': '80ms' }}>Walid Akaraniti</h1>
        <p className="hero-role rise" style={{ '--d': '160ms' }} aria-label={ROLES.join(', ')}>
          <span className="role-prefix">&gt;</span> <span aria-hidden="true">{role}</span>
          <span className="caret" aria-hidden="true" />
        </p>

        <p className="hero-desc rise" style={{ '--d': '240ms' }}>
          Bridging the gap between software and the physical world. I design intelligent IoT systems,
          embedded firmware (ESP32 / Raspberry Pi), computer vision AI, 3D prototyping, and robust backend APIs.
        </p>

        <div className="hero-actions rise" style={{ '--d': '320ms' }}>
          <button className="btn-primary" onClick={() => scrollTo('projects')}>
            View work <span className="btn-arrow">→</span>
          </button>
          <button className="btn-secondary" onClick={() => scrollTo('contact')}>Contact</button>
        </div>

        <dl className="hero-stats rise" style={{ '--d': '400ms' }}>
          <div><dt>Experience</dt><dd>{years}+ yrs</dd></div>
          <div><dt>Projects</dt><dd>{stats.projectsCount ? projects : '—'}</dd></div>
          <div><dt>Technologies</dt><dd>{stats.skillsCount ? skills : '—'}</dd></div>
        </dl>
      </div>
    </section>
  )
}

export default Hero
