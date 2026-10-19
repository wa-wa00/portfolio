import mongoose from 'mongoose'

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

export default mongoose.model('Project', projectSchema)
