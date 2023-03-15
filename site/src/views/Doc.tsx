import { defineComponent } from 'vue'

export const Doc = defineComponent({
  name: 'Doc',
  setup() {
    return () => (
      <div>
        <h1>Doc</h1>
        <p>This is the doc page.</p>
      </div>
    )
  },
})
