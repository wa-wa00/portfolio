import mongoose from 'mongoose'

// ใช้ Direct URI เชื่อมต่อไปยัง Shards โดยตรง 100% ไม่ต้องพึ่งพา DNS SRV lookup
const DIRECT_MONGODB_URI = 'mongodb://Admin:walid7879@ac-p2cbioi-shard-00-00.7ykl3j8.mongodb.net:27017,ac-p2cbioi-shard-00-01.7ykl3j8.mongodb.net:27017,ac-p2cbioi-shard-00-02.7ykl3j8.mongodb.net:27017/portfolio?ssl=true&replicaSet=atlas-71y4ds-shard-0&authSource=admin&retryWrites=true&w=majority'

let cachedConn = null

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
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const { id } = req.query

  try {
    await connectDB()
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
