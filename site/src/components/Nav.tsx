import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import logoUrl from '../assets/logo.png'

export const SiteNav = defineComponent({
  name: 'SiteNav',
  setup() {
    return () => (
      <header class='flex justify-between items-center h[72px] w-full position-fixed left-0 top-0 z-11 px-24 text-16'>
        <RouterLink to='/home'>
          <div class='inline-flex items-center italic'>
            <img src={logoUrl} alt="" class='h[36px] mr-4' />
            <span class='text-#171a1d'>Ding Design-Vue3.0</span>
          </div>
        </RouterLink>
        <div class='px-12 mx-12 text-14'>
          <a href="https://standard.dingtalk.com" target="_blank" class='text-#171a1d'>
            钉钉官方React版本
          </a>
        </div>
      </header>
    )
  },
})
