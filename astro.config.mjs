// @ts-check
import { defineConfig, fontProviders } from 'astro/config'

import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://franziskeer.github.io',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Brasika Display',
      cssVariable: '--font-brasika-display',
      fallbacks: ['serif'],
      options: {
        variants: [
          {
            src: [
              './src/assets/fonts/BrasikaDisplay.woff2',
              './src/assets/fonts/BrasikaDisplay.woff',
            ],
            weight: 'normal',
            style: 'normal',
          },
        ],
      },
    },
    {
      provider: fontProviders.google(),
      name: 'Sora',
      cssVariable: '--font-sora',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
    },
  ],
})
