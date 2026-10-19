import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PROJECTS as DEFAULT_PROJECTS } from '../../data/projects'
import useInView from '../../hooks/useInView'
import './Projects.css'

const GH = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

const ExtLink = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)

const ProjectCard = ({ p, delay }) => {
  const [ref, inView] = useInView()
  const navigate = useNavigate()

  const onMove = (e) => {
    const card = ref.current
    if (!card) return
    const { left, top, width, height } = card.getBoundingClientRect()
    const rx = ((e.clientY - top - height / 2) / (height / 2)) * -9
    const ry = ((e.clientX - left - width / 2) / (width / 2)) * 9
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.025)`
  }

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale(1)'
  }

  const handleCardClick = (e) => {
    // Prevent navigating to detail page if user clicked on GitHub or Live links directly
    if (e.target.closest('.plink')) return
    navigate(`/project/${p.id}`)
  }

  return (
    <div
      ref={ref}
      className={`proj-card glass-card fade-in ${inView ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms`, cursor: 'pointer' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={handleCardClick}
    >
      <div className={`proj-glow ${p.glow}`} />
      
      {/* --- Image Section --- */}
      {p.image && (
        <div className="proj-image-container">
          <img src={p.image} alt={p.title} className="proj-image" />
          <div className="proj-image-overlay"></div>
          <div className="proj-icon-overlay">{p.icon}</div>
        </div>
      )}

      <div className="proj-content-wrapper">
        {/* Fallback icon if no image */}
        {!p.image && <div className="proj-icon">{p.icon}</div>}
        
        <h3 className="proj-title">{p.title}</h3>
        <p className="proj-desc">{p.desc}</p>
        <div className="proj-tags">
          {p.tags.map((t) => <span key={t} className="proj-tag">{t}</span>)}
        </div>
        <div className="proj-links">
          <a href={p.github} target="_blank" rel="noopener noreferrer" className="plink"><GH /> GitHub</a>
          <a href={p.live}   target="_blank" rel="noopener noreferrer" className="plink primary"><ExtLink /> Live</a>
        </div>
      </div>
    </div>
  )
}

const Projects = () => {
  const [titleRef, titleInView] = useInView()
  const [projects, setProjects] = useState(DEFAULT_PROJECTS)

  useEffect(() => {
    // Fetch dynamically from MongoDB / API
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data)
        }
      })
      .catch(err => {
        console.log('MongoDB API unreachable, using default projects:', err)
      })
  }, [])

  return (
    <section id="projects" className="section projects-section">
      <div className="proj-bg-orb" />
      <div className="container">
        <div ref={titleRef} className={`section-header fade-in ${titleInView ? 'visible' : ''}`}>
          <div className="section-label">Work</div>
          <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
          <p className="section-desc">A selection of projects showcasing my backend expertise and approach to solving real problems.</p>
        </div>

        <div className="proj-grid">
          {projects.map((p, i) => <ProjectCard key={p.id || i} p={p} delay={i * 75} />)}
        </div>
      </div>
    </section>
  )
}

export default Projects
