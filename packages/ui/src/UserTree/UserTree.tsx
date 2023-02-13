import type { PropType } from 'vue'
import { defineComponent, onMounted, ref, watch } from 'vue'
import type { UserItem } from '..'
import './style'
import { getListByCheckStatus, updateTreeCheckedStatus } from './uitls'
import { UserTreeNav } from './UserTreeNav'

export const UserTree = defineComponent({
  name: 'DUserTree',
  props: {
    treeData: {
      type: Array as PropType<UserItem[]>,
      default: () => [],
    },
    checked: {
      type: Array as PropType<UserItem[]>,
      default: () => [],
    },
  },
  emits: ['update:checked'],
  setup(props, { emit }) {
    const navList = ref<UserItem[]>([])
    const leftData = ref<UserItem[]>([])
    const nodeClick = (item: UserItem) => {
      item.checked = !item.checked
      updateTreeCheckedStatus(props.treeData, item, item.checked)
      const checkedList = getListByCheckStatus(props.treeData, true)
      emit('update:checked', checkedList)
    }
    const cancelChecked = (item: UserItem) => {
      emit('update:checked', props.checked.filter(i => i.id !== item.id))
    }

    const updateLeftData = (item: UserItem) => {
      navList.value.push(item)
      leftData.value = navList.value[navList.value.length - 1].children || []
    }
    const updateListListChecked = () => {
      leftData.value.forEach((item) => {
        item.checked = props.checked.some(i => i.id === item.id)
      })
    }
    onMounted(() => {
      leftData.value = props.treeData
    })
    watch(() => props.checked, () => {
      updateListListChecked()
    })
    watch(leftData, () => {
      updateListListChecked()
    })

    watch(navList, (val) => {
      if (val.length === 0) {
        leftData.value = props.treeData
      }
      else {
        leftData.value = val[val.length - 1].children || []
      }
    })
    return () => (
      <div class="dtd-d-tree-wrapper">
        <div class="dtd-d-tree-left">
          <UserTreeNav v-model:navList={navList.value}/>
          <ul >
          {leftData.value.length > 0
            ? leftData.value.map((item) => {
              return (
              <li key={item.id}>
                <div onClick={() => nodeClick(item)}>
                    <input type="checkbox" checked={item.checked} indeterminate={ item.indeterminate} />
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
              <span onClick={() => cancelChecked(item)}>{ item.name}</span>
            )
          })}
        </div>
      </div>
    )
  },
})
