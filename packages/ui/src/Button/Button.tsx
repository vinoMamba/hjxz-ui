import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'
import './style'

export const Button = defineComponent({
  name: 'DButton',
  props: {
    type: {
      type: String as PropType<'primary' | 'danger' | 'link'>,
      default: '',
    },
  },
  setup(props, { slots }) {
    const classes = computed(() => {
      return [
        'dtd-button',
        `dtd-button-${props.type}`,
      ]
    })
    return () => (
      <button class={classes.value}>
        <span>
          {slots.default?.()}
        </span>
      </button>
    )
  },
})
