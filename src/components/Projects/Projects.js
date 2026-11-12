import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PROJECTS as DEFAULT_PROJECTS } from '../../data/projects'
import useInView from '../../hooks/useInView'
import './Projects.css'

const ProjectRow = ({ p, index }) => {
  const [ref, inView] = useInView()

  return (
    <Link
      ref={ref}
      to={`/project/${p.id}`}
      className={`proj-row fade-in ${inView ? 'visible' : ''}`}
    >
      {p.image && (
        <div className="proj-thumb">
          <img src={p.image} alt={p.title} loading="lazy" />
        </div>
      )}
      <div className="proj-text">
        <span className="proj-index">{String(index + 1).padStart(2, '0')}</span>
        <h3 className="proj-title">{p.title}</h3>
        <p className="proj-desc">{p.desc}</p>
        <div className="tags">
          {(p.tags || []).map((t) => <span key={t} className="tag">{t}</span>)}
        </div>
        <span className="proj-more">View project <span className="proj-arrow">→</span></span>
      </div>
    </Link>
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
        if (Array.isArray(data) && data.length > 0) setProjects(data)
      })
      .catch(err => console.log('MongoDB API unreachable, using default projects:', err))
  }, [])

  return (
    <section id="projects" className="section">
      <div className="container">
        <div ref={titleRef} className={`section-head fade-in ${titleInView ? 'visible' : ''}`}>
          <p className="section-label">03 / Work</p>
          <h2 className="section-title">Selected projects.</h2>
        </div>

        <div className="proj-list">
          {projects.map((p, i) => <ProjectRow key={p.id || i} p={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}

export default Projects
