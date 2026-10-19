import mongoose from 'mongoose'

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, default: '⚡' },
  level: { type: Number, required: true },
  cat: { type: String, required: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Skill || mongoose.model('Skill', skillSchema)
