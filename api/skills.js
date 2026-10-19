import mongoose from 'mongoose'

// ใช้ Direct URI เชื่อมต่อไปยัง Shards โดยตรง 100% ไม่ต้องพึ่งพา DNS SRV lookup
const DIRECT_MONGODB_URI = 'mongodb://Admin:walid7879@ac-p2cbioi-shard-00-00.7ykl3j8.mongodb.net:27017,ac-p2cbioi-shard-00-01.7ykl3j8.mongodb.net:27017,ac-p2cbioi-shard-00-02.7ykl3j8.mongodb.net:27017/portfolio?ssl=true&replicaSet=atlas-71y4ds-shard-0&authSource=admin&retryWrites=true&w=majority'

let cachedConn = null

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

  try {
    await connectDB()
    const skills = await Skill.find().sort({ order: 1, createdAt: 1 })
    return res.status(200).json(skills)
  } catch (err) {
    console.error('Skills DB fetch error:', err.message)
    return res.status(500).json({ error: err.message })
  }
}
