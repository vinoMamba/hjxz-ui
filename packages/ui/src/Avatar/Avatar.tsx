import { defineComponent, reactive } from 'vue'

export const Avatar = defineComponent({
  name: 'DAvatar',
  props: {
    src: {
      type: String,
      default: '',
    },
    width: {
      type: Number,
      default: 36,
    },
  },
  setup(props) {
    const style = reactive({
      width: `${props.width}px`,
      height: `${props.width}px`,
      borderRadius: '5px',
    })
    return () => (
      <img src={props.src} style={style} />
    )
  },
})
