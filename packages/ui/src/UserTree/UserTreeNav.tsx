import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import type { UserItem } from '..'

export const UserTreeNav = defineComponent({
  name: 'DUserTreeNav',
  props: {
    navList: {
      type: Array as PropType<UserItem[]>,
      default: () => [],
    },
  },
  emits: ['update:navList'],
  setup(props, { emit }) {
    const handleClick = (index: number) => {
      const sliceData = props.navList.slice(0, index + 1)
      emit('update:navList', sliceData)
    }
    const reset = () => {
      emit('update:navList', [])
    }
    return () => (
      <nav class="dtd-d-tree-nav">
        <span onClick={() => reset()}>通讯录</span>
        {props.navList.map((item, index) => {
          return (
            <>
              <i>&gt;</i>
              <span onClick={() => handleClick(index)}>{ item.name}</span>
            </>
          )
        })}
      </nav>
    )
  },
})
