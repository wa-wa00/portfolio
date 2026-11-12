import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>&copy; {new Date().getFullYear()} Walid Akaraniti</p>
        <div className="footer-links">
          <a href="https://github.com/wa-wa00" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="mailto:walid.akaraniti@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
