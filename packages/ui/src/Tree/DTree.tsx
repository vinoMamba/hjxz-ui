import type { PropType } from 'vue'
import { defineComponent, onMounted, ref, watch } from 'vue'
import { Avatar } from '../Avatar/Avatar'
import imgUrl from './images/dep.png'
import { DTreeNav } from './DTreeNav'
import { getAllCheckedNodes, updateStatusByNode, updateTreeStatus } from './uitls'
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
    single: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: Number as PropType<0 | 1>, // 0: 选部门 1: 选人
      default: 1,
    },
  },
  emits: ['update:checked'],
  setup(props, { emit }) {
    const navList = ref<DNode[]>([])
    const leftData = ref<DNode[]>([])

    const nodeClick = (item: DNode) => {
      item.checked = !item.checked
      item.indeterminate = item.checked ? false : item.indeterminate
      updateTreeStatus(props.treeData, item, item.checked)
      const checkeds = getAllCheckedNodes(props.treeData, props.mode)
      emit('update:checked', checkeds)
    }

    const cancelClick = (item: DNode) => {
      updateStatusByNode(props.treeData, item, false)
      const checkeds = getAllCheckedNodes(props.treeData, props.mode)
      emit('update:checked', checkeds)
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

    onMounted(() => {
      props.checked.forEach((item) => {
        updateStatusByNode(props.treeData, item, true)
      })
      leftData.value = props.treeData
    })

    watch(() => props.treeData, () => {
      props.checked.forEach((item) => {
        updateStatusByNode(props.treeData, item, true)
      })
      leftData.value = props.treeData
    })
    return () => (
      <div class="dtd-d-tree-wrapper">
        <div class="dtd-d-tree-left">
          <DTreeNav v-model:navList={navList.value} />
          {leftData.value.length > 0
            ? <ul >{
              leftData.value.map((item) => {
                return (
                  <li key={item.id}>
                    <div onClick={() => nodeClick(item)} >
                      <input value="logo" type="checkbox" checked={item.checked} indeterminate={item.indeterminate} disabled={item.type === 0 && props.single} />
                      <label for="logo"></label>
                      <Avatar src={item.avatar ?? imgUrl} />
                      <span>{item.name}</span>
                    </div>
                    {item.type === 0
                      ? <span onClick={() => updateLeftData(item)}>下级</span>
                      : null}
                  </li>
                )
              })
            }</ul>
            : <div class="dtd-d-tree-empty">暂无数据</div>}
        </div>
        <div class="dtd-d-tree-right">
          <p>已选择：{props.checked.length ?? 0}</p>
          <ul>
            {props.checked.map((item) => {
              return (
                <li>
                  <Avatar src={item.avatar ?? imgUrl} width={24} />
                  <span onClick={() => cancelClick(item)}>{item.name}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  },
})
