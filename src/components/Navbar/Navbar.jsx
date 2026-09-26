import { useState, useEffect } from 'react'
import './Navbar.css'

const links = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Blog', id: 'blog' },
  { label: 'Contact', id: 'contact' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner container">
        {/* Logo */}
        <button className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="bracket">&lt;</span>Walid<span className="bracket"> /&gt;</span>
        </button>

        {/* Desktop links */}
        <div className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(({ label, id }) => (
            <button key={id} className="nav-link" onClick={() => scrollTo(id)}>
              {label}
            </button>
          ))}
        </div>

        {/* CTA + hamburger */}
        <div className="nav-right">
          <button className="btn-primary hire-btn" onClick={() => scrollTo('contact')}>
            Hire Me
          </button>
          <button
            className={`hamburger ${open ? 'open' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
