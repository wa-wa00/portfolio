import dotenv from 'dotenv'
import mongoose from 'mongoose'
import dns from 'dns'

dns.setServers(['8.8.8.8', '8.8.4.4'])

dotenv.config()

const uri = process.env.MONGODB_URI

console.log('🔍 กำลังตรวจสอบการเชื่อมต่อ Database...')

if (!uri || uri.trim() === '') {
  console.log('❌ ยังไม่ได้กำหนด MONGODB_URI ในไฟล์ server/.env')
  console.log('👉 กรุณาเปิดไฟล์ server/.env แล้วใส่ Connection String ต่อท้าย MONGODB_URI=')
  process.exit(1)
}

try {
  await mongoose.connect(uri)
  console.log('✅ เชื่อมต่อ MongoDB สำเร็จเรียบร้อย!')
  
  // ตรวจสอบ Collections ที่มีอยู่
  const collections = await mongoose.connection.db.listCollections().toArray()
  console.log(`📦 พบ Collections ทั้งหมด ${collections.length} รายการ:`, collections.map(c => c.name))
  
  await mongoose.disconnect()
  console.log('👋 ปิดการเชื่อมต่อเรียบร้อย')
} catch (err) {
  console.error('❌ เกิดข้อผิดพลาดในการเชื่อมต่อ MongoDB:', err.message)
}
