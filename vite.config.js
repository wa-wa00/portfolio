import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path'

// โหลด MONGODB_URI จาก server/.env ให้ Vite รู้จัก
dotenv.config({ path: path.resolve(process.cwd(), 'server/.env') })

function apiMiddlewarePlugin() {
  return {
    name: 'api-serverless-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // เสริม res.status() และ res.json() สำหรับ Node http response
        if (!res.status) {
          res.status = function(code) {
            this.statusCode = code
            return this
          }
        }
        if (!res.json) {
          res.json = function(data) {
            this.setHeader('Content-Type', 'application/json')
            this.end(JSON.stringify(data))
            return this
          }
        }

        const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`)
        
        if (url.pathname === '/api/skills') {
          try {
            const { default: handler } = await import('./api/skills.js')
            req.query = Object.fromEntries(url.searchParams.entries())
            return await handler(req, res)
          } catch (e) {
            console.error('API Error (/api/skills):', e)
            res.status(500).json({ error: e.message })
            return
          }
        }

        if (url.pathname === '/api/projects') {
          try {
            const { default: handler } = await import('./api/projects.js')
            req.query = Object.fromEntries(url.searchParams.entries())
            return await handler(req, res)
          } catch (e) {
            console.error('API Error (/api/projects):', e)
            res.status(500).json({ error: e.message })
            return
          }
        }

        if (url.pathname === '/api/contact') {
          try {
            const { default: handler } = await import('./api/contact.js')
            let body = ''
            req.on('data', chunk => { body += chunk })
            req.on('end', async () => {
              try { req.body = JSON.parse(body) } catch {}
              await handler(req, res)
            })
            return
          } catch (e) {
            console.error('API Error (/api/contact):', e)
            res.status(500).json({ error: e.message })
            return
          }
        }

        next()
      })
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), apiMiddlewarePlugin()],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
})
