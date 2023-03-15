import { defineComponent, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

export const Doc = defineComponent({
  setup() {
    const componentList = ref([
      { link: 'button', title: '按钮', enTitle: 'Button' },
    ])
    return () => (
      <div class='h-screen overflow-auto pt-72 flex'>
        <aside class='bg-#f2f2f6 pt-24 w[249px] side-border'>
          <ul class='px-20 h-full'>
            {componentList.value.map(component => (
              <li key={component.enTitle} class='h[42px] rounded-5 vertical-baseline'>
                <RouterLink
                  class='flex items-center text-14  overflow-hidden side-a-border p-8 pl-24 block outline-none rounded-5'
                  to={`/doc/${component.link}`}
                  activeClass={'side-a-border-active'}
                >
                  {component.title}
                  <span class='ml-4'>{component.enTitle}</span>
                </RouterLink>
              </li>
            ))}
          </ul>
        </aside>
        <main class='flex-1'>
          <RouterView />
        </main>
      </div>
    )
  },
})
