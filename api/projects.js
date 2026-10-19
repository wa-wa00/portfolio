import mongoose from 'mongoose'
import dns from 'dns'
import { PROJECTS as DEFAULT_PROJECTS } from '../src/data/projects.js'

dns.setServers(['8.8.8.8', '8.8.4.4'])

let isConnected = false

const projectSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  icon: { type: String, default: '🚀' },
  desc: { type: String, required: true },
  content: { type: String },
  image: { type: String },
  gallery: [{ type: String }],
  tags: [{ type: String }],
  github: { type: String, default: '#' },
  live: { type: String, default: '#' },
  glow: { type: String, default: 'glow-p' },
  createdAt: { type: Date, default: Date.now }
})

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema)

async function connectDB() {
  if (isConnected || !process.env.MONGODB_URI) return isConnected
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    isConnected = true
    console.log('MongoDB Connected in Vercel Serverless')
    return true
  } catch (err) {
    console.error('MongoDB connection error:', err)
    return false
  }
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const { id } = req.query

  const connected = await connectDB()

  if (connected) {
    try {
      // Auto-seed if database is empty
      const count = await Project.countDocuments()
      if (count === 0) {
        await Project.insertMany(DEFAULT_PROJECTS)
      }

      if (id) {
        const item = await Project.findOne({ id })
        if (item) return res.status(200).json(item)
      } else {
        const list = await Project.find().sort({ createdAt: -1 })
        if (list && list.length > 0) return res.status(200).json(list)
      }
    } catch (e) {
      console.error('DB fetch failed, falling back:', e.message)
    }
  }

  // Fallback to local data
  if (id) {
    const fallback = DEFAULT_PROJECTS.find(p => p.id === id)
    return res.status(200).json(fallback || null)
  }
  return res.status(200).json(DEFAULT_PROJECTS)
}
