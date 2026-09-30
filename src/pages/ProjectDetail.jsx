import { useParams, Link, Navigate } from 'react-router-dom'
import { PROJECTS } from '../data/projects'
import './ProjectDetail.css'
import { useEffect, useState } from 'react'

const ProjectDetail = () => {
  const { id } = useParams()
  const project = PROJECTS.find(p => p.id === id)
  const [mounted, setMounted] = useState(false)

  // Scroll to top and trigger animation
  useEffect(() => {
    window.scrollTo(0, 0)
    setMounted(true)
  }, [id])

  if (!project) {
    return <Navigate to="/" />
  }

  return (
    <div className="project-detail-page section">
      <div className="pd-bg-orb" />
      <div className="container">
        
        <div className={`fade-in ${mounted ? 'visible' : ''}`} style={{ transitionDelay: '0ms' }}>
          <Link to="/" className="btn-secondary back-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Projects
          </Link>
        </div>

        <div className={`pd-header fade-in ${mounted ? 'visible' : ''}`} style={{ transitionDelay: '100ms' }}>
          <div className="pd-title-group">
            <div className="pd-icon-large glass-card">{project.icon}</div>
            <h1 className="pd-title gradient-text">{project.title}</h1>
          </div>
          <p className="pd-short-desc">{project.desc}</p>
        </div>

        {project.image && (
          <div className={`pd-image-wrapper glass-card fade-in ${mounted ? 'visible' : ''}`} style={{ transitionDelay: '200ms' }}>
            <img src={project.image} alt={project.title} className="pd-image" />
            <div className="pd-image-glow" />
          </div>
        )}

        <div className={`pd-grid fade-in ${mounted ? 'visible' : ''}`} style={{ transitionDelay: '300ms' }}>
          {/* Left Column: Content */}
          <div className="pd-content">
            <h2 className="pd-subtitle">Project Overview</h2>
            <p className="pd-desc">{project.content || project.desc}</p>
            
            <div className="pd-links">
              {project.live !== '#' && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  View Live Demo
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ marginLeft: '8px' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                </a>
              )}
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" style={{ marginRight: '8px' }}>
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                Source Code
              </a>
            </div>
          </div>

          {/* Right Column: Tech Stack Sidebar */}
          <div className="pd-sidebar">
            <div className="glass-card pd-tech-card">
              <h3 className="pd-subtitle" style={{ fontSize: '20px', marginBottom: '20px' }}>Technologies</h3>
              <div className="pd-tags">
                {project.tags.map(t => <span key={t} className="proj-tag pd-tag">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default ProjectDetail
