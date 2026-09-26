import { useState } from 'react'
import useInView from '../../hooks/useInView'
import './Contact.css'

const Contact = () => {
  const [ref, inView] = useInView()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    // Simulate API call
    setTimeout(() => {
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus(null), 3000)
    }, 1000)
  }

  return (
    <section id="contact" className="section contact-section">
      <div className="contact-bg-orb" />
      <div className="container">
        <div ref={ref} className={`contact-wrapper fade-in ${inView ? 'visible' : ''}`}>
          
          {/* Left side: Info */}
          <div className="contact-info">
            <div className="section-label">Get In Touch</div>
            <h2 className="section-title">Let's build something <span className="gradient-text">amazing</span></h2>
            <p className="contact-desc">
              Currently open for new opportunities. Whether you have a question, a project in mind, 
              or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className="contact-methods">
              <div className="c-method">
                <div className="cm-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p className="cm-label">Email</p>
                  <a href="mailto:walid.akaraniti@gmail.com" className="cm-val">walid.akaraniti@gmail.com</a>
                </div>
              </div>

              <div className="c-method">
                <div className="cm-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="cm-label">Location</p>
                  <p className="cm-val">Bangkok, Thailand (Remote)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side: Form */}
          <form className="contact-form glass-card" onSubmit={handleSubmit}>
            <h3 className="cf-title">Send a message</h3>
            
            <div className="cf-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" id="name" name="name" 
                placeholder="John Doe" 
                value={form.name} onChange={handleChange} required 
              />
            </div>

            <div className="cf-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" id="email" name="email" 
                placeholder="john@example.com" 
                value={form.email} onChange={handleChange} required 
              />
            </div>

            <div className="cf-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" name="message" 
                placeholder="How can I help you?" rows="4" 
                value={form.message} onChange={handleChange} required 
              />
            </div>

            <button type="submit" className="btn-primary cf-submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Message Sent!' : 'Send Message'}
            </button>
          </form>

        </div>
      </div>
    </section>
  )
}

export default Contact
