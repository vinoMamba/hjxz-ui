import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'

export const Home = defineComponent({
  setup() {
    return () => (
      <>
        <div class='p-0 h-screen bg-[url(https://gw.alicdn.com/imgextra/i3/O1CN01X3jpfh1XbTy3KON4i_!!6000000002942-2-tps-3072-1728.png)] bg-cover overflow-hidden flex items-center'>
          <div class='ml-480 p-8'>
            <p class='text-36  italic'>钉钉风格 UI组件库</p>
            <RouterLink to={'/doc'}>
              <button class='cursor-pointer p-12 px-24 m-12 text-16 border-none outline-none bg-#007fff text-white rounded-8 hover:bg-#0066cc'>
                开始使用
              </button>
            </RouterLink>
          </div>
        </div>
      </>
    )
  },
})
