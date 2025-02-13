import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    setupFiles: ['dotenv/config'],
    environmentMatchGlobs: [['src/modules/*/controllers/*.spec.ts', 'prisma']],
  },
})
