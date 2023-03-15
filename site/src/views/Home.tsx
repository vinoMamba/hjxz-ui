import { defineComponent } from 'vue'

export const Home = defineComponent({
  name: 'Home',
  setup() {
    return () => (
      <div>
        <h1>Home</h1>
        <p>This is the home page.</p>
      </div>
    )
  },
})
