import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <p className="footer-logo">
            <span className="bracket">&lt;</span>Walid<span className="bracket"> /&gt;</span>
          </p>
          <p className="footer-text">
            Building robust and scalable backend systems.
          </p>
        </div>

        <div className="footer-right">
          <div className="footer-links">
            <a href="https://github.com/wa-wa00" target="_blank" rel="noopener">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noopener">Twitter</a>
          </div>
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} Walid Akaraniti. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
