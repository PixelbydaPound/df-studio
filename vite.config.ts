import { defineConfig, loadEnv, type Plugin } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import {
  buildAuthCookie,
  isAuthenticatedCookie,
  validatePassword,
} from './lib/auth-config'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

function versionedImportResolver() {
  return {
    name: 'versioned-import-resolver',
    async resolveId(id, importer, options) {
      const match = id.match(/^(.+?)@\d+\.\d+\.\d+$/)
      if (!match) return null

      return this.resolve(match[1], importer, { ...options, skipSelf: true })
    },
  }
}

function readJsonBody(request: import('http').IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let data = ''

    request.on('data', (chunk) => {
      data += chunk
    })

    request.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {})
      } catch (error) {
        reject(error)
      }
    })

    request.on('error', reject)
  })
}

function authApiDevPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'auth-api-dev',
    configureServer(server) {
      process.env.SITE_PASSWORD = env.SITE_PASSWORD || env.VITE_SITE_PASSWORD
      process.env.AUTH_SECRET = env.AUTH_SECRET || env.VITE_AUTH_SECRET
      process.env.NODE_ENV = 'development'

      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) {
          next()
          return
        }

        if (req.url === '/api/auth' && req.method === 'GET') {
          const authenticated = isAuthenticatedCookie(req.headers.cookie)

          res.statusCode = authenticated ? 200 : 401
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ authenticated }))
          return
        }

        if (req.url === '/api/login' && req.method === 'POST') {
          try {
            const body = (await readJsonBody(req)) as { password?: string }
            const password = typeof body.password === 'string' ? body.password : ''

            if (!validatePassword(password)) {
              res.statusCode = 401
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Invalid password' }))
              return
            }

            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.setHeader('Set-Cookie', buildAuthCookie())
            res.end(JSON.stringify({ ok: true }))
          } catch {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Invalid request' }))
          }

          return
        }

        next()
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      authApiDevPlugin(env),
      versionedImportResolver(),
      figmaAssetResolver(),
      // The React and Tailwind plugins are both required for Make, even if
      // Tailwind is not being actively used – do not remove them
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/app'),
      },
    },
  }
})
