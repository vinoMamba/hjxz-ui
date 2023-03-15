import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { SiteNav } from './components/Nav'

export const App = defineComponent({
  name: 'App',
  setup() {
    return () => (
      <>
        <SiteNav />
        <RouterView />
      </>
    )
  },
})
