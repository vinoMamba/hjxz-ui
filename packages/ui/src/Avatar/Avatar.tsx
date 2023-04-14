import { computed, defineComponent, reactive } from 'vue'

export const Avatar = defineComponent({
  name: 'DAvatar',
  props: {
    src: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: '',
    },
    width: {
      type: Number,
      default: 36,
    },
  },
  setup(props) {
    const imgStyle = reactive({
      width: `${props.width}px`,
      height: `${props.width}px`,
      borderRadius: '5px',
    })
    const strStyle = reactive({
      width: `${props.width}px`,
      height: `${props.width}px`,
      borderRadius: '5px',
      backgroundColor: '#007fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
    })
    const altStr = computed(() => {
      // 截取字符串第一个字符
      if (props.alt) {
        return props.alt.slice(0, 1)
      }
      else {
        return ''
      }
    })
    return () => {
      if (props.src) {
        return <img src={props.src} style={imgStyle} alt={props.alt} />
      }
      else {
        return <div style={strStyle}>{altStr.value}</div>
      }
    }
  },
})
