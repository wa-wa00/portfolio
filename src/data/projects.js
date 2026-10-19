export const PROJECTS = [
  {
    id: 'api-gateway',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800'
    ],
    icon: '🔗', 
    title: 'API Gateway Service',
    desc: 'High-performance API gateway with rate limiting, JWT auth, and request routing built with FastAPI and Redis.',
    content: 'This project is a high-performance API gateway designed to act as the single entry point for a microservices architecture. It handles request routing, rate limiting to prevent abuse, and centralized JWT authentication. Built with Python and FastAPI for high throughput, and Redis for caching and fast rate-limit tracking.',
    tags: ['Python', 'FastAPI', 'Redis', 'Docker'],
    github: 'https://github.com/wa-wa00', 
    live: '#', 
    glow: 'glow-p',
  },
  {
    id: 'task-management',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800'
    ],
    icon: '✅', 
    title: 'Task Management System',
    desc: 'Full-stack task manager with real-time updates via WebSocket, built with Node.js, Express, and PostgreSQL.',
    content: 'A comprehensive task management system that allows teams to collaborate in real-time. Features include Kanban boards, task assignments, due dates, and instant updates across all clients using WebSockets. The backend is powered by Node.js and Express, with PostgreSQL handling relational data storage.',
    tags: ['Node.js', 'Express', 'PostgreSQL', 'WebSocket'],
    github: 'https://github.com/wa-wa00', 
    live: '#', 
    glow: 'glow-b',
  },
  {
    id: 'k8s-microservices',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'
    ],
    icon: '☸️', 
    title: 'K8s Microservices',
    desc: 'Kubernetes-based microservices deployment with Helm charts, HPA auto-scaling, and Prometheus monitoring.',
    content: 'Infrastructure as Code (IaC) setup for deploying a scalable microservices architecture. Utilizes Kubernetes for orchestration, Helm for package management, and Horizontal Pod Autoscaling (HPA) to handle traffic spikes. Integrated with Prometheus and Grafana for comprehensive system monitoring and alerting.',
    tags: ['Kubernetes', 'Docker', 'Helm', 'Prometheus'],
    github: 'https://github.com/wa-wa00', 
    live: '#', 
    glow: 'glow-c',
  },
  {
    id: 'finance-mobile',
    image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?auto=format&fit=crop&q=80&w=800'
    ],
    icon: '💰', 
    title: 'Finance Mobile App',
    desc: 'Cross-platform personal finance tracker built with Flutter, featuring real-time sync and offline-first support.',
    content: 'A mobile application for tracking personal finances, expenses, and budgets. Built with Flutter to support both iOS and Android natively. Uses Firebase for real-time data synchronization across devices and implements an offline-first architecture using local SQLite databases.',
    tags: ['Flutter', 'Firebase', 'Dart'],
    github: 'https://github.com/wa-wa00', 
    live: '#', 
    glow: 'glow-p',
  },
  {
    id: 'auth-microservice',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee57d5?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1555949963-aa79dcee57d5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1510511459019-5d55ad34f381?auto=format&fit=crop&q=80&w=800'
    ],
    icon: '🔒', 
    title: 'Auth Microservice',
    desc: 'Secure authentication service with JWT, OAuth2, 2FA, and RBAC permission management.',
    content: 'A dedicated, secure microservice handling all user authentication and authorization. Supports email/password login, OAuth2 social logins (Google, GitHub), and Two-Factor Authentication (2FA). Implements Role-Based Access Control (RBAC) to manage user permissions dynamically.',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'JWT'],
    github: 'https://github.com/wa-wa00', 
    live: '#', 
    glow: 'glow-b',
  },
  {
    id: 'etl-pipeline',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800'
    ],
    icon: '📊', 
    title: 'ETL Data Pipeline',
    desc: 'Async ETL pipeline for processing large datasets with Celery workers, monitoring, and failure recovery.',
    content: 'An automated Extract, Transform, Load (ETL) pipeline designed to process millions of records daily. Uses Python and Celery distributed task queues to process data asynchronously. Includes robust error handling, automatic retries, and dead-letter queues managed via RabbitMQ.',
    tags: ['Python', 'Celery', 'MongoDB', 'RabbitMQ'],
    github: 'https://github.com/wa-wa00', 
    live: '#', 
    glow: 'glow-c',
  },
]
