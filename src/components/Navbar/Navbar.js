import { useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import './Navbar.css'

const links = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setOpen(false)
    if (location.pathname !== '/') {
      // Navigate to home first, then scroll
      navigate('/')
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner container">
        {/* Logo */}
        <button className="nav-logo" onClick={handleLogoClick}>
          <span className="logo-bracket">&lt;</span>
          <span className="logo-name">Walid.dev</span>
          <span className="logo-bracket">/&gt;</span>
        </button>

        {/* Desktop links */}
        <div className="nav-links">
          {links.map((l) => (
            <button key={l.id} className="nav-link" onClick={() => scrollTo(l.id)}>
              {l.label}
            </button>
          ))}
          <button className="btn-primary nav-cta" onClick={() => scrollTo('contact')}>
            Let's Talk
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className={`nav-toggle ${open ? 'open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        {links.map((l) => (
          <button key={l.id} className="mobile-link" onClick={() => scrollTo(l.id)}>
            {l.label}
          </button>
        ))}
        <button className="btn-primary mobile-cta" onClick={() => scrollTo('contact')}>
          Let's Talk
        </button>
      </div>
    </nav>
  )
}

export default Navbar
