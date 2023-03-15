import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno } from 'unocss'
import sourceCode from './build/vite/sourceCode'

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
        ['demo-border', { border: '1px solid #d9d9d9' }],
        ['demo-hover', {
          'border': '1px solid transparent',
          'box-shadow': '0 0 6px 2px rgba(56, 104, 125, 0.2)',
        }],
        ['api-li', {
          'font-size': '14px',
          'padding': '16px 0',
          'display': 'flex',
          'align-items': 'center',
          'justify-content': 'space-around',
          'border-bottom': '1px solid #d9d9d9',
          'color': 'rgba(0, 0, 0, 0.6)',
        }],
        ['api-span', {
          'display': 'flex',
          'align-items': ' center',
          'justify-content': 'center',
          'width': '25%',
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
    sourceCode(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
