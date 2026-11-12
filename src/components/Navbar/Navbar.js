import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
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
  const [active, setActive] = useState('')
  const [progress, setProgress] = useState(0)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  // Highlight the section currently in view
  useEffect(() => {
    if (location.pathname !== '/') { setActive(''); return }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    const ids = ['hero', ...links.map((l) => l.id)]
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [location.pathname])

  const scrollTo = (id) => {
    setOpen(false)
    if (location.pathname !== '/') {
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
          Walid Akaraniti
        </button>

        {/* Links (desktop & mobile dropdown) */}
        <div className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(({ label, id }) => (
            <button key={id} className={`nav-link ${active === id ? 'active' : ''}`} onClick={() => scrollTo(id)}>
              {label}
            </button>
          ))}
        </div>

        <button
          className={`hamburger ${open ? 'open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span /><span />
        </button>
      </div>
      <div className="nav-progress" style={{ transform: `scaleX(${progress})` }} />
    </nav>
  )
}

export default Navbar
