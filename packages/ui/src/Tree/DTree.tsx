import type { PropType } from 'vue'
import { defineComponent, onMounted, ref, watch } from 'vue'
import { Avatar } from '../Avatar/Avatar'
import imgUrl from './images/dep.png'
import { DTreeNav } from './DTreeNav'
import { getAllCheckedNodes, updateDisabledByNode, updateStatusByNode, updateTreeStatus } from './utils'
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
    disabled: {
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
    /**
     * 右侧列表是否块级元素
     */
    block: {
      type: Boolean,
      default: false,
    },
    checkStrictly: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:checked'],
  setup(props, { emit }) {
    const navList = ref<DNode[]>([])
    const leftData = ref<DNode[]>([])
    const all = ref(false)

    const nodeClick = (item: DNode) => {
      if (item.disabled) {
        return
      }
      item.checked = !item.checked
      item.indeterminate = item.checked ? false : item.indeterminate
      if (!props.checkStrictly) {
        updateTreeStatus(props.treeData, item, item.checked)
      }
      const checkeds = getAllCheckedNodes(props.treeData, props.mode)
      emit('update:checked', checkeds)
    }

    const checkALl = () => {
      all.value = !all.value
      console.log(all.value)
      console.log(leftData.value)
      leftData.value.forEach((item) => {
        if (item.disabled) {
          return
        }
        item.checked = all.value
        item.indeterminate = all.value ? false : item.indeterminate
        if (!props.checkStrictly) {
          updateTreeStatus(props.treeData, item, item.checked)
        }
        const checkeds = getAllCheckedNodes(props.treeData, props.mode)
        emit('update:checked', checkeds)
      })
    }
    const cancelClick = (item: DNode) => {
      updateStatusByNode(props.treeData, item, false)
      const checkeds = getAllCheckedNodes(props.treeData, props.mode)
      emit('update:checked', checkeds)
    }

    const updateLeftData = (item: DNode) => {
      if (item.disabled || all.value) {
        return
      }
      navList.value.push(item)
      leftData.value = navList.value[navList.value.length - 1].children || []
    }

    watch(navList, (val) => {
      all.value = false
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
      props.disabled.forEach((item) => {
        updateDisabledByNode(props.treeData, item, true)
      })
      leftData.value = props.treeData
    })

    watch(() => props.treeData, () => {
      props.checked.forEach((item) => {
        updateStatusByNode(props.treeData, item, true)
      })
      props.disabled.forEach((item) => {
        updateDisabledByNode(props.treeData, item, true)
      })
      leftData.value = props.treeData
    })
    return () => (
      <div class="dtd-d-tree-wrapper">
        <div class="dtd-d-tree-left">
          <DTreeNav v-model:navList={navList.value} />
          {!props.single && (
            <div class='dtd-d-tree-left-all' onClick={checkALl}>
              <input name="all" type="checkbox" checked={all.value} />
              <label for="all"></label>
              <span>全选</span>
            </div>
          )}
          {leftData.value.length > 0
            ? <ul >{
              leftData.value.map((item) => {
                return (
                  <li key={item.id} class={item.disabled ? 'disabled' : ''}>
                    <div onClick={() => nodeClick(item)} >
                      <input name="logo" type="checkbox" checked={item.checked} indeterminate={item.indeterminate} disabled={item.type === 0 && props.single} />
                      <label for="logo"></label>
                      <Avatar src={item.avatar ?? imgUrl} />
                      <span>{item.name}</span>
                    </div>
                    {item.type === 0
                      ? <span onClick={() => updateLeftData(item)} style={{
                        color: all.value ? '#ccc' : '#1890ff',
                      }}>下级</span>
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
                <li style={props.block ? { width: '100%' } : {}} onClick={() => cancelClick(item)}>
                  <Avatar src={item.avatar ?? imgUrl} width={24} />
                  <span >{item.name}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  },
})
