import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const packageJsonUrl = new URL('./package.json', import.meta.url)

const readVersion = (): string =>
  (JSON.parse(readFileSync(packageJsonUrl, 'utf8')) as { version: string }).version

/**
 * Publishes the deployed version at /version.json so running clients can notice
 * a new release and force an update. Read fresh on every dev request so bumping
 * package.json triggers the update gate without restarting the server.
 */
function versionManifest(): Plugin {
  return {
    name: 'vintagely-version-manifest',
    configureServer(server) {
      server.middlewares.use('/version.json', (_request, response) => {
        response.setHeader('Content-Type', 'application/json')
        response.setHeader('Cache-Control', 'no-store')
        response.end(JSON.stringify({ version: readVersion() }))
      })
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'version.json',
        source: JSON.stringify({ version: readVersion() }),
      })
    },
  }
}

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(readVersion()),
  },
  plugins: [react(), tailwindcss(), versionManifest()],
})
