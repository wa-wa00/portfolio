import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Project from './models/Project.js'
import Message from './models/Message.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI

app.use(cors())
app.use(express.json())

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Portfolio API with MongoDB is running!')
})

// 1. Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 })
    res.json(projects)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// 2. Get single project by id
app.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findOne({ id: req.params.id })
    if (!project) return res.status(404).json({ message: 'Project not found' })
    res.json(project)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// 3. Save contact message into MongoDB
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please provide name, email, and message' })
    }
    const newMessage = await Message.create({ name, email, message })
    res.status(201).json({ message: 'Message sent successfully!', data: newMessage })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// 4. Seed initial projects into MongoDB
app.post('/api/projects/seed', async (req, res) => {
  try {
    const { projects } = req.body
    if (!projects || !Array.isArray(projects)) {
      return res.status(400).json({ message: 'Invalid projects data' })
    }
    await Project.deleteMany({}) // Clear old projects
    const inserted = await Project.insertMany(projects)
    res.json({ message: `Successfully seeded ${inserted.length} projects!`, data: inserted })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Connect to MongoDB & start server
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log(' connected to MongoDB successfully!')
      app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`))
    })
    .catch((err) => {
      console.error('❌ MongoDB connection error:', err.message)
      app.listen(PORT, () => console.log(`⚠️ Server running without DB on http://localhost:${PORT}`))
    })
} else {
  console.log('⚠️ No MONGODB_URI provided in .env file')
  app.listen(PORT, () => console.log(`⚠️ Server running without DB on http://localhost:${PORT}`))
}
