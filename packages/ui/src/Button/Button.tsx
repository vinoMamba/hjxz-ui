import { defineComponent } from 'vue'
import './style'

export const Button = defineComponent({
  name: 'DButton',
  setup() {
    return () => <button class="button">1</button>
  },
})
