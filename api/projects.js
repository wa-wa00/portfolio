import mongoose from 'mongoose'
import dns from 'dns'

dns.setServers(['8.8.8.8', '8.8.4.4'])

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Admin:walid7879@portfoliodb.7ykl3j8.mongodb.net/portfolio?retryWrites=true&w=majority&authSource=admin'

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
  if (isConnected) return true
  try {
    await mongoose.connect(MONGODB_URI)
    isConnected = true
    return true
  } catch (err) {
    console.error('MongoDB connection error:', err)
    return false
  }
}

export default async function handler(req, res) {
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
      if (id) {
        const item = await Project.findOne({ id })
        if (item) return res.status(200).json(item)
        return res.status(404).json({ error: 'Project not found' })
      } else {
        const list = await Project.find().sort({ createdAt: -1 })
        return res.status(200).json(list)
      }
    } catch (e) {
      console.error('DB fetch failed:', e.message)
      return res.status(500).json({ error: e.message })
    }
  }

  return res.status(500).json({ error: 'Cannot connect to MongoDB database' })
}
