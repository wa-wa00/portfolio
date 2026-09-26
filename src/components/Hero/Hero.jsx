import { useState, useEffect } from 'react'
import './Hero.css'

const ROLES = ['Backend Developer', 'API Architect', 'Cloud Engineer', 'Open Source Builder']

const Hero = () => {
  const [text, setText] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const role = ROLES[roleIdx]
    let timer

    if (!deleting && text === role) {
      timer = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && text === '') {
      setDeleting(false)
      setRoleIdx((i) => (i + 1) % ROLES.length)
    } else {
      timer = setTimeout(
        () => setText((t) => (deleting ? t.slice(0, -1) : role.slice(0, t.length + 1))),
        deleting ? 48 : 95
      )
    }
    return () => clearTimeout(timer)
  }, [text, deleting, roleIdx])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className="hero">
      {/* Ambient orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Floating tech cards */}
      <div className="fcard fcard-1 glass-card"><span>🐍</span><small>FastAPI</small></div>
      <div className="fcard fcard-2 glass-card"><span>🐳</span><small>Docker</small></div>
      <div className="fcard fcard-3 glass-card"><span>☸️</span><small>K8s</small></div>
      <div className="fcard fcard-4 glass-card"><span>⚡</span><small>Node.js</small></div>

      <div className="hero-content container">
        <div className="hero-badge">
          <span className="pulse-dot" />
          Available for opportunities
        </div>

        <h1 className="hero-title">
          Hi, I'm <span className="gradient-text">Walid</span>
        </h1>

        <div className="hero-role">
          <span className="role-text">{text}</span>
          <span className="cursor">|</span>
        </div>

        <p className="hero-desc">
          Building scalable backend systems, robust APIs, and cloud-native infrastructure.
          I turn complex problems into elegant, production-ready solutions.
        </p>

        <div className="hero-actions">
          <button className="btn-primary" onClick={() => scrollTo('projects')}>
            View My Work
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <button className="btn-secondary" onClick={() => scrollTo('contact')}>
            Contact Me
          </button>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-n gradient-text">3+</span>
            <span className="stat-l">Years Exp.</span>
          </div>
          <div className="stat-div" />
          <div className="stat">
            <span className="stat-n gradient-text">20+</span>
            <span className="stat-l">Projects</span>
          </div>
          <div className="stat-div" />
          <div className="stat">
            <span className="stat-n gradient-text">10+</span>
            <span className="stat-l">Technologies</span>
          </div>
        </div>
      </div>

      <div className="scroll-hint">
        <div className="scroll-pill"><div className="scroll-dot" /></div>
      </div>
    </section>
  )
}

export default Hero
