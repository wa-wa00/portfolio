import mongoose from 'mongoose'
import dns from 'dns'

dns.setServers(['8.8.8.8', '8.8.4.4'])

let isConnected = false

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema)

async function connectDB() {
  if (isConnected || !process.env.MONGODB_URI) return isConnected
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    isConnected = true
    return true
  } catch (err) {
    console.error('MongoDB connection error:', err)
    return false
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, email, message } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' })
  }

  const connected = await connectDB()

  if (connected) {
    try {
      const saved = await Message.create({ name, email, message })
      return res.status(201).json({ success: true, message: 'Message saved to MongoDB!', data: saved })
    } catch (err) {
      console.error('Error saving message to MongoDB:', err)
      return res.status(500).json({ success: false, error: err.message })
    }
  }

  // If DB not connected, respond with mock success so user form still feels responsive
  return res.status(200).json({ success: true, message: 'Message received (DB offline mock)' })
}
