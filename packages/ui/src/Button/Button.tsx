import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'
import './style'

export const Button = defineComponent({
  name: 'DButton',
  inheritAttrs: true,
  props: {
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>,
    },
    type: {
      type: String as PropType<'primary' | 'danger' | 'link'>,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
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
      <button class={classes.value} disabled={props.disabled} onClick={props.onClick}>
        <span>
          {slots.default?.()}
        </span>
      </button>
    )
  },
})
