import useInView from '../../hooks/useInView'
import './Blog.css'

const POSTS = [
  {
    icon: '🐍', tag: 'Backend', grad: 'bg1',
    date: 'Sep 15, 2026', read: '8 min read',
    title: 'Building Production-Ready APIs with FastAPI',
    excerpt: 'Best practices for structuring, documenting, and deploying FastAPI applications at scale with async patterns.',
  },
  {
    icon: '☸️', tag: 'DevOps', grad: 'bg2',
    date: 'Aug 28, 2026', read: '12 min read',
    title: 'Kubernetes for Backend Developers',
    excerpt: 'A practical guide to deploying and managing containerised backend services with Kubernetes and Helm.',
  },
  {
    icon: '🗄️', tag: 'Database', grad: 'bg3',
    date: 'Aug 10, 2026', read: '10 min read',
    title: 'Database Patterns for Microservices',
    excerpt: 'Exploring database-per-service, CQRS, and event sourcing patterns in distributed system architectures.',
  },
]

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
)

const BlogCard = ({ post, delay }) => {
  const [ref, inView] = useInView()
  return (
    <article ref={ref} className={`blog-card glass-card fade-in ${inView ? 'visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className={`blog-head ${post.grad}`}>
        <span className="blog-icon">{post.icon}</span>
        <span className="blog-tag">{post.tag}</span>
      </div>
      <div className="blog-body">
        <div className="blog-meta">
          <span>{post.date}</span><span>·</span><span>{post.read}</span>
        </div>
        <h3 className="blog-title">{post.title}</h3>
        <p className="blog-excerpt">{post.excerpt}</p>
        <a href="#" className="blog-more">Read article <ArrowRight /></a>
      </div>
    </article>
  )
}

const Blog = () => {
  const [titleRef, titleInView] = useInView()

  return (
    <section id="blog" className="section blog-section">
      <div className="container">
        <div ref={titleRef} className={`section-header fade-in ${titleInView ? 'visible' : ''}`}>
          <div className="section-label">Writing</div>
          <h2 className="section-title">Latest <span className="gradient-text">Articles</span></h2>
          <p className="section-desc">Thoughts, tutorials, and insights on backend development and engineering.</p>
        </div>

        <div className="blog-grid">
          {POSTS.map((p, i) => <BlogCard key={p.title} post={p} delay={i * 100} />)}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a href="#" className="btn-secondary">View All Articles →</a>
        </div>
      </div>
    </section>
  )
}

export default Blog
