import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { copyFileSync, mkdirSync, readdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'copy-images',
      closeBundle() {
        try {
          // Copy images to dist folder after build
          const imagesDir = resolve(__dirname, 'dist/images')
          const sourceDir = resolve(__dirname, 'public/images')
          
          mkdirSync(imagesDir, { recursive: true })
          
          // Read all PNG files from source directory
          const images = readdirSync(sourceDir).filter(file => file.endsWith('.png'))
          
          images.forEach(image => {
            const source = join(sourceDir, image)
            const dest = join(imagesDir, image)
            try {
              copyFileSync(source, dest)
            } catch (err) {
              console.warn(`Warning: Could not copy ${image}:`, err.message)
            }
          })
          
          console.log(`Copied ${images.length} images to dist/images/`)
        } catch (err) {
          console.error('Error copying images:', err.message)
        }
      }
    }
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'AffectiveSliderVue',
      fileName: (format) => `affective-slider-vue.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'affectiveslidervue.css'
          return assetInfo.name
        }
      }
    }
  }
})
