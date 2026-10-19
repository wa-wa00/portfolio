import mongoose from 'mongoose'
import dns from 'dns'
import dotenv from 'dotenv'
import Project from './models/Project.js'
import { PROJECTS } from '../src/data/projects.js'

dns.setServers(['8.8.8.8', '8.8.4.4'])
dotenv.config()

async function seed() {
  console.log('🌱 กำลังนำเข้าข้อมูลโปรเจกต์และรูปภาพลง MongoDB...')
  await mongoose.connect(process.env.MONGODB_URI)
  
  await Project.deleteMany({})
  const inserted = await Project.insertMany(PROJECTS)
  console.log(`✅ นำเข้าข้อมูลสำเร็จทั้งหมด ${inserted.length} โปรเจกต์เรียบร้อยแล้ว!`)
  
  for (const p of inserted) {
    console.log(`  - [${p.id}] ${p.title} (รูปภาพหน้าปก: ${p.image ? 'มี' : 'ไม่มี'}, แกลเลอรี: ${p.gallery.length} รูป)`)
  }
  
  await mongoose.disconnect()
  console.log('🚀 ฐานข้อมูลพร้อมใช้งาน 100% แล้ว!')
}

seed().catch(console.error)
