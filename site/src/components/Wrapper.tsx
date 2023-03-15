import { defineComponent } from 'vue'
export const Wrapper = defineComponent({
  name: 'Wrapper',
  setup(_, { slots }) {
    return () => (
      <div class="p-16">
        {slots.default?.()}
      </div>
    )
  },
})
