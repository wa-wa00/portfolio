import { useState, useEffect } from 'react'
import { SKILLS as DEFAULT_SKILLS, CATS } from '../../data/skills'
import useInView from '../../hooks/useInView'
import './Skills.css'

const SkillCard = ({ skill, delay }) => {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={`sk-card glass-card fade-in ${inView ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="sk-icon">{skill.icon}</span>
      <div className="sk-info">
        <p className="sk-name">{skill.name}</p>
        <div className="sk-bar">
          <div className="sk-fill" style={{ width: inView ? `${skill.level}%` : '0%' }} />
        </div>
        <span className="sk-pct">{skill.level}%</span>
      </div>
      <span className="sk-badge">{skill.cat}</span>
    </div>
  )
}

const Skills = () => {
  const [cat, setCat] = useState('All')
  const [skills, setSkills] = useState(DEFAULT_SKILLS)
  const [titleRef, titleInView] = useInView()

  useEffect(() => {
    // Fetch dynamically from MongoDB API
    fetch('/api/skills')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setSkills(data)
        }
      })
      .catch(err => {
        console.log('Using local fallback for skills:', err)
      })
  }, [])

  const filtered = cat === 'All' ? skills : skills.filter((s) => s.cat === cat)

  return (
    <section id="skills" className="section skills-section">
      <div className="skills-bg-orb" />
      <div className="container">
        <div ref={titleRef} className={`section-header fade-in ${titleInView ? 'visible' : ''}`}>
          <div className="section-label">Expertise</div>
          <h2 className="section-title">
            My <span className="gradient-text">Technical Skills</span>
          </h2>
          <p className="section-desc">
            Tools and technologies I use to build scalable, production-ready systems.
          </p>
        </div>

        <div className="cat-pills">
          {CATS.map((c) => (
            <button key={c} className={`cat-pill ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>
              {c}
            </button>
          ))}
        </div>

        <div className="skills-grid">
          {filtered.map((s, i) => <SkillCard key={s.name || i} skill={s} delay={i * 55} />)}
        </div>
      </div>
    </section>
  )
}

export default Skills
