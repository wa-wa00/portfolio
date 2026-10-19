import mongoose from 'mongoose'
import dns from 'dns'

dns.setServers(['8.8.8.8', '8.8.4.4'])

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Admin:walid7879@portfoliodb.7ykl3j8.mongodb.net/portfolio?retryWrites=true&w=majority&authSource=admin'

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
  if (isConnected) return true
  try {
    await mongoose.connect(MONGODB_URI)
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
      const skills = await Skill.find().sort({ order: 1, createdAt: 1 })
      return res.status(200).json(skills)
    } catch (err) {
      console.error('Skills DB fetch error:', err.message)
      return res.status(500).json({ error: err.message })
    }
  }

  return res.status(500).json({ error: 'Cannot connect to MongoDB database' })
}
