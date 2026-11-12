import { useState } from 'react'
import useInView from '../../hooks/useInView'
import './Contact.css'

const Contact = () => {
  const [ref, inView] = useInView()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('sent') // Fallback UI
      }
    } catch (err) {
      console.log('Sending message fallback:', err)
      setStatus('sent')
    }
    setTimeout(() => setStatus(null), 3000)
  }

  return (
    <section id="contact" className="section">
      <div ref={ref} className={`container fade-in ${inView ? 'visible' : ''}`}>
        <div className="section-head">
          <p className="section-label">04 / Contact</p>
          <h2 className="section-title">Let's build something together.</h2>
        </div>

        <div className="section-body contact-grid">
          <div className="contact-info">
            <p className="contact-desc">
              Currently open for new opportunities. Whether you have a question, a project in mind,
              or just want to say hi, I'll try my best to get back to you.
            </p>
            <dl className="contact-list">
              <div>
                <dt>Email</dt>
                <dd><a href="mailto:walid.akaraniti@gmail.com" className="text-link">walid.akaraniti@gmail.com</a></dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>Bangkok, Thailand (Remote)</dd>
              </div>
            </dl>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="cf-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="cf-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="cf-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="4" value={form.message} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn-primary cf-submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Message sent' : 'Send message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
