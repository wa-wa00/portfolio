import mongoose from 'mongoose'
import dns from 'dns'
import dotenv from 'dotenv'
import Project from './models/Project.js'
import Skill from './models/Skill.js'
import { PROJECTS } from '../src/data/projects.js'
import { SKILLS } from '../src/data/skills.js'

dns.setServers(['8.8.8.8', '8.8.4.4'])
dotenv.config()

async function seed() {
  console.log('🌱 กำลังเชื่อมต่อ MongoDB เพื่อนำเข้าข้อมูล...')
  await mongoose.connect(process.env.MONGODB_URI)

  // 1. Seed Projects
  await Project.deleteMany({})
  const insertedProjects = await Project.insertMany(PROJECTS)
  console.log(`✅ นำเข้าข้อมูล Projects สำเร็จ: ${insertedProjects.length} โปรเจกต์`)

  // 2. Seed Skills
  await Skill.deleteMany({})
  const insertedSkills = await Skill.insertMany(SKILLS)
  console.log(`✅ นำเข้าข้อมูล Skills สำเร็จ: ${insertedSkills.length} ทักษะ`)
  for (const s of insertedSkills) {
    console.log(`  - [${s.cat}] ${s.icon} ${s.name} (${s.level}%)`)
  }

  await mongoose.disconnect()
  console.log('🚀 นำเข้าข้อมูลทั้งหมดลง MongoDB เรียบร้อย 100%!')
}

seed().catch(console.error)
