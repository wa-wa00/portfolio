import mongoose from 'mongoose'

// ใช้ Direct URI เพื่อเชื่อมต่อ MongoDB Atlas Shards โดยตรง 100% ไม่หลุด DNS
const DIRECT_MONGODB_URI = 'mongodb://Admin:walid7879@ac-p2cbioi-shard-00-00.7ykl3j8.mongodb.net:27017,ac-p2cbioi-shard-00-01.7ykl3j8.mongodb.net:27017,ac-p2cbioi-shard-00-02.7ykl3j8.mongodb.net:27017/portfolio?ssl=true&replicaSet=atlas-71y4ds-shard-0&authSource=admin&retryWrites=true&w=majority'

let cachedConn = null

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema)

async function connectDB() {
  if (cachedConn && mongoose.connection.readyState === 1) {
    return cachedConn
  }

  cachedConn = await mongoose.connect(DIRECT_MONGODB_URI, {
    serverSelectionTimeoutMS: 8000,
  })
  return cachedConn
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

  try {
    await connectDB()
    const saved = await Message.create({ name, email, message })
    return res.status(201).json({ success: true, message: 'Message saved to MongoDB!', data: saved })
  } catch (err) {
    console.error('Error saving message to MongoDB:', err)
    return res.status(500).json({ success: false, error: err.message })
  }
}
