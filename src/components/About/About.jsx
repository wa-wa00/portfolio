import useInView from '../../hooks/useInView'
import './About.css'

const About = () => {
  const [ref, inView] = useInView()

  return (
    <section id="about" className="section about-section">
      <div className="about-bg-orb" />
      <div className="container">
        <div ref={ref} className={`about-grid fade-in ${inView ? 'visible' : ''}`}>

          {/* ── Avatar card ── */}
          <div className="avatar-wrap">
            <div className="avatar-card glass-card">
              <div className="avatar-glow" />
              <div className="avatar-img">
                <svg viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="36" r="22" fill="url(#ag)" />
                  <path d="M8 96 Q8 66 50 66 Q92 66 92 96" fill="url(#ag)" opacity=".65" />
                  <defs>
                    <linearGradient id="ag" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <p className="avatar-name">Walid Akaraniti</p>
              <p className="avatar-role">Backend Developer</p>
              <div className="avatar-links">
                <a href="https://github.com/wa-wa00" target="_blank" rel="noopener" className="av-link" title="GitHub">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                <a href="mailto:walid.akaraniti@gmail.com" className="av-link" title="Email">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* ── Info ── */}
          <div className="about-info">
            <div className="section-label">About Me</div>
            <h2 className="section-title">
              Crafting the <span className="gradient-text">backbone</span>
              <br />of digital products
            </h2>
            <p className="about-p">
              I'm a Backend Developer passionate about building reliable, scalable, and maintainable
              systems. With expertise in Python, Node.js, and cloud infrastructure, I specialise in
              designing APIs and microservices that power modern applications.
            </p>
            <p className="about-p">
              Outside of work I enjoy exploring new technologies, contributing to open-source
              projects, and sharing knowledge with the developer community.
            </p>

            <div className="highlights">
              {[
                { icon: '🎯', title: 'Clean Architecture', desc: 'SOLID principles & design patterns' },
                { icon: '🚀', title: 'Performance First',   desc: 'Optimised APIs & efficient queries' },
                { icon: '🔒', title: 'Security Focused',    desc: 'Best practices & secure by design' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="hl-item glass-card">
                  <span className="hl-icon">{icon}</span>
                  <div>
                    <p className="hl-title">{title}</p>
                    <p className="hl-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
