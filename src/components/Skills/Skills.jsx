import { useState } from 'react'
import useInView from '../../hooks/useInView'
import './Skills.css'

const SKILLS = [
  { name: 'Python / FastAPI',    icon: '🐍', level: 90, cat: 'Backend'  },
  { name: 'Node.js / Express',   icon: '⚡', level: 85, cat: 'Backend'  },
  { name: 'REST & GraphQL',      icon: '🔗', level: 90, cat: 'Backend'  },
  { name: 'Docker',              icon: '🐳', level: 88, cat: 'DevOps'   },
  { name: 'Kubernetes',          icon: '☸️', level: 75, cat: 'DevOps'   },
  { name: 'CI/CD Pipelines',     icon: '🔄', level: 80, cat: 'DevOps'   },
  { name: 'PostgreSQL / NoSQL',  icon: '🗄️', level: 86, cat: 'Database' },
  { name: 'Redis / Caching',     icon: '💾', level: 78, cat: 'Database' },
  { name: 'React / Next.js',     icon: '⚛️', level: 75, cat: 'Frontend' },
  { name: 'Flutter',             icon: '💙', level: 70, cat: 'Mobile'   },
  { name: 'Linux / Shell',       icon: '🐧', level: 82, cat: 'Tools'    },
  { name: 'Git / GitHub',        icon: '🔀', level: 92, cat: 'Tools'    },
]

const CATS = ['All', 'Backend', 'DevOps', 'Database', 'Frontend', 'Mobile', 'Tools']

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
  const [titleRef, titleInView] = useInView()
  const filtered = cat === 'All' ? SKILLS : SKILLS.filter((s) => s.cat === cat)

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
          {filtered.map((s, i) => <SkillCard key={s.name} skill={s} delay={i * 55} />)}
        </div>
      </div>
    </section>
  )
}

export default Skills
