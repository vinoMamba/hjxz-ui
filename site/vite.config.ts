import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno } from 'unocss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    UnoCSS({
      rules: [
        ['nav-bgf', { 'backdrop-filter': 'blur(20px)' }],
        ['nav-letter', { 'letter-spacing': '1px' }],
        ['nav-bs', { 'box-shadow': '0 2px 4px rgb(0 0 0 / 12%)' }],
        ['side-border', { 'border-right': '1px solid var(--common_line_light_color, hsla(210, 7%, 53%, .16))' }],
        ['side-a-border', { 'border-right': '3px solid transparent' }],
        ['side-a-border-active', {
          background: 'hsla(210, 7%, 53%, .16)',
          color: 'var(--common_level1_base_color, #171a1d)',
        }],
      ],
      shortcuts: [
        { logo: 'i-logos-vue w-6em h-6em transform transition-800' },
      ],
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          extraProperties: {
            'display': 'inline-block',
            'vertical-align': 'middle',
          },
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
