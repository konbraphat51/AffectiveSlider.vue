import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { copyFileSync, mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'copy-images',
      closeBundle() {
        // Copy images to dist folder after build
        const imagesDir = resolve(__dirname, 'dist/images')
        mkdirSync(imagesDir, { recursive: true })
        
        const images = [
          'AS_happy.png',
          'AS_unhappy.png',
          'AS_sleepy.png',
          'AS_wideawake.png',
          'AS_intensity_cue.png'
        ]
        
        images.forEach(image => {
          copyFileSync(
            resolve(__dirname, 'public/images', image),
            resolve(__dirname, 'dist/images', image)
          )
        })
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
