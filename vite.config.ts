import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { copyFileSync, mkdirSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'copy-images',
      closeBundle() {
        const imagesDir = resolve(__dirname, 'dist/images')
        if (!existsSync(imagesDir)) {
          mkdirSync(imagesDir, { recursive: true })
        }
        const sourceDir = resolve(__dirname, 'src/assets/images')
        const images = [
          'AS_happy.png',
          'AS_unhappy.png',
          'AS_sleepy.png',
          'AS_wideawake.png',
          'AS_intensity_cue.png'
        ]
        images.forEach(img => {
          copyFileSync(
            resolve(sourceDir, img),
            resolve(imagesDir, img)
          )
        })
      }
    }
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
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
          return assetInfo.name || 'unknown-asset'
        }
      }
    }
  }
})
