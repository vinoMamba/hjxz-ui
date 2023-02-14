import type { PropType } from 'vue'
import { defineComponent, ref, watch, watchEffect } from 'vue'
import { DTreeNav } from './DTreeNav'
import type { DNode } from '.'
import './style'

export const DTree = defineComponent({
  name: 'DTree',
  props: {
    treeData: {
      type: Array as PropType<DNode[]>,
      default: () => [],
    },
    checked: {
      type: Array as PropType<DNode[]>,
      default: () => [],
    },
  },
  emits: ['update:checked'],
  setup(props, { emit }) {
    const navList = ref<DNode[]>([])
    const leftData = ref<DNode[]>([])
    const nodeClick = (item: DNode) => {
      item.checked = !item.checked
    }
    const cancelChecked = (item: DNode) => {
      emit('update:checked', props.checked.filter(i => i.id !== item.id))
    }

    const updateLeftData = (item: DNode) => {
      navList.value.push(item)
      leftData.value = navList.value[navList.value.length - 1].children || []
    }

    watch(navList, (val) => {
      if (val.length === 0) {
        leftData.value = props.treeData
      }
      else {
        leftData.value = val[val.length - 1].children || []
      }
    })

    watchEffect(() => {
      leftData.value = props.treeData
    })

    return () => (
      <div class="dtd-d-tree-wrapper">
        <div class="dtd-d-tree-left">
          <DTreeNav v-model:navList={navList.value} />
          <ul >
            {leftData.value.length > 0
              ? leftData.value.map((item) => {
                return (
                  <li key={item.id}>
                    <div onClick={() => nodeClick(item)}>
                      <input type="checkbox" checked={item.checked} indeterminate={item.indeterminate} />
                      <span>{item.name}</span>
                    </div>
                    {item.type === 0
                      ? <span onClick={() => updateLeftData(item)}>下级</span>
                      : null}
                  </li>
                )
              })
              : <li>暂无数据</li>}
          </ul>
        </div>
        <div class="dtd-d-tree-right">
          {props.checked.map((item) => {
            return (
              <span onClick={() => cancelChecked(item)}>{item.name}</span>
            )
          })}
        </div>
      </div>
    )
  },
})
