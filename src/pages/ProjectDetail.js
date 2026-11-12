import { useParams, Link, Navigate } from 'react-router-dom'
import { PROJECTS } from '../data/projects'
import './ProjectDetail.css'
import { useEffect, useState, useCallback } from 'react'

const ProjectDetail = () => {
  const { id } = useParams()
  const [project, setProject] = useState(() => PROJECTS.find(p => p.id === id) || null)
  const [loading, setLoading] = useState(!project)
  const [mounted, setMounted] = useState(false)
  const [lightbox, setLightbox] = useState(-1)

  const images = project ? [project.image, ...(project.gallery || [])].filter(Boolean) : []
  const close = useCallback(() => setLightbox(-1), [])
  const step = useCallback((d) => setLightbox((i) => (i + d + images.length) % images.length), [images.length])

  // Keyboard controls for the lightbox
  useEffect(() => {
    if (lightbox < 0) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [lightbox, close, step])

  // Scroll to top and trigger animation
  useEffect(() => {
    window.scrollTo(0, 0)
    setMounted(true)

    // Fetch dynamically from MongoDB API
    fetch(`/api/projects?id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data && (data.title || data.id)) {
          setProject(data)
        }
        setLoading(false)
      })
      .catch(err => {
        console.log('Using local fallback for project detail:', err)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div className="project-detail-page">
        <div className="container pd-loading">Loading project…</div>
      </div>
    )
  }

  if (!project) {
    return <Navigate to="/" />
  }

  return (
    <div className="project-detail-page">
      <div className={`container fade-in ${mounted ? 'visible' : ''}`}>
        <Link to="/" className="back-link">← Back</Link>

        <header className="pd-header">
          <h1 className="pd-title">{project.title}</h1>
          <p className="pd-short-desc">{project.desc}</p>
        </header>

        {project.image && (
          <button className="pd-image" onClick={() => setLightbox(0)} aria-label="Open image">
            <img src={project.image} alt={project.title} />
          </button>
        )}

        <div className="pd-grid">
          <div>
            <p className="section-label">Overview</p>
            <p className="pd-desc">{project.content || project.desc}</p>
            <div className="pd-links">
              {project.live && project.live !== '#' && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary">Live demo ↗</a>
              )}
              {project.github && project.github !== '#' && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">Source code ↗</a>
              )}
            </div>
          </div>

          <aside>
            <p className="section-label">Stack</p>
            <ul className="pd-stack">
              {(project.tags || []).map(t => <li key={t}>{t}</li>)}
            </ul>
          </aside>
        </div>

        {project.gallery && project.gallery.length > 0 && (
          <section className="pd-gallery">
            <p className="section-label">Gallery</p>
            <div className="pd-gallery-grid">
              {project.gallery.map((img, idx) => (
                <button
                  key={idx}
                  className="pd-gallery-item"
                  onClick={() => setLightbox(images.indexOf(img))}
                  aria-label={`Open image ${idx + 1}`}
                >
                  <img src={img} alt={`${project.title} screenshot ${idx + 1}`} loading="lazy" />
                </button>
              ))}
            </div>
          </section>
        )}
      </div>

      {lightbox >= 0 && (
        <div className="lightbox" onClick={close} role="dialog" aria-modal="true">
          <img
            key={lightbox}
            src={images[lightbox]}
            alt={`${project.title} ${lightbox + 1}`}
            onClick={(e) => e.stopPropagation()}
          />
          {images.length > 1 && (
            <>
              <button className="lb-nav lb-prev" onClick={(e) => { e.stopPropagation(); step(-1) }} aria-label="Previous">←</button>
              <button className="lb-nav lb-next" onClick={(e) => { e.stopPropagation(); step(1) }} aria-label="Next">→</button>
            </>
          )}
          <span className="lb-count">{lightbox + 1} / {images.length}</span>
          <button className="lb-close" onClick={close} aria-label="Close">Esc ✕</button>
        </div>
      )}
    </div>
  )
}

export default ProjectDetail
