import mongoose from 'mongoose'
import dns from 'dns'
import { SKILLS as DEFAULT_SKILLS } from '../src/data/skills.js'

dns.setServers(['8.8.8.8', '8.8.4.4'])

let isConnected = false

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, default: '⚡' },
  level: { type: Number, required: true },
  cat: { type: String, required: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
})

const Skill = mongoose.models.Skill || mongoose.model('Skill', skillSchema)

async function connectDB() {
  if (isConnected || !process.env.MONGODB_URI) return isConnected
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    isConnected = true
    return true
  } catch (err) {
    console.error('MongoDB connection error in skills:', err)
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

  const connected = await connectDB()

  if (connected) {
    try {
      // Auto-seed if empty
      const count = await Skill.countDocuments()
      if (count === 0) {
        await Skill.insertMany(DEFAULT_SKILLS)
      }

      const skills = await Skill.find().sort({ order: 1, createdAt: 1 })
      if (skills && skills.length > 0) {
        return res.status(200).json(skills)
      }
    } catch (err) {
      console.error('Skills DB fetch error, falling back:', err.message)
    }
  }

  // Fallback to local data
  return res.status(200).json(DEFAULT_SKILLS)
}
