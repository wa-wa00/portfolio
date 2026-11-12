import { useState, useEffect } from 'react'
import { SKILLS as DEFAULT_SKILLS } from '../../data/skills'
import useInView from '../../hooks/useInView'
import './Skills.css'

const Skills = () => {
  const [skills, setSkills] = useState(DEFAULT_SKILLS)
  const [ref, inView] = useInView()

  useEffect(() => {
    // ดึงข้อมูลสดจาก MongoDB Database
    fetch('/api/skills')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setSkills(data)
      })
      .catch(err => console.error('Skills fetch error:', err))
  }, [])

  // จัดกลุ่มตามหมวดหมู่ (คงลำดับตามที่ปรากฏในข้อมูล)
  const groups = skills.reduce((acc, s) => {
    const cat = s.cat || 'Other'
    ;(acc[cat] ||= []).push(s.name)
    return acc
  }, {})

  return (
    <section id="skills" className="section">
      <div ref={ref} className={`container fade-in ${inView ? 'visible' : ''}`}>
        <div className="section-head">
          <p className="section-label">02 / Skills</p>
          <h2 className="section-title">Tools and technologies I work with.</h2>
        </div>

        <dl className="section-body skill-groups">
          {Object.entries(groups).map(([cat, names]) => (
            <div key={cat} className="skill-row">
              <dt>{cat}</dt>
              <dd>{names.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export default Skills
