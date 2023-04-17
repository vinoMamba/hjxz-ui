import type { PropType } from 'vue'
import { defineComponent, ref, watch } from 'vue'
import { Avatar } from '../Avatar/Avatar'
import imgUrl from './images/dep.png'
import { DTreeNav } from './DTreeNav'
import { getAllCheckedNodes, traverseTree, updateDisabledByNode, updateStatusByNode, updateTreeStatus, updateTreeStatusSingle } from './utils'
import type { DNode } from '.'
import './style'

const CloseIcon = defineComponent({
  name: 'CloseIcon',
  setup() {
    return () => (
      <button class="dtd-d-tree-close-btn">
        <span class="dtd-d-tree-close-icon"></span>
      </button>
    )
  },
})

export const DTree = defineComponent({
  name: 'DTree',
  props: {
    searchValue: {
      type: String as PropType<string>,
      default: '',
    },
    treeData: {
      type: Array as PropType<DNode[]>,
      default: () => [],
    },
    // 多选的情况下，0：只选部门，1：之选人员
    mode: {
      type: Number as PropType<0 | 1>,
      default: 1,
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

    maxChecked: {
      type: Number,
      default: -1,
    },
    nodeClickFn: {
      type: Function as PropType<(item: DNode) => boolean>,
    },
  },
  emits: ['update:checked', 'update:searchValue'],
  setup(props, { emit }) {
    const navList = ref<DNode[]>([])
    const leftData = ref<DNode[]>([])
    const all = ref(false)

    const nodeClick2 = (item: DNode) => {
      // 暴露节点点击事件的函数，返回 true 继续，返回false 退出
      if (props.nodeClickFn instanceof Function && !props.nodeClickFn(item)) {
        return
      }
      if (item.disabled) {
        return
      }

      // 如果是单选，则父子组件非受控,因此设置了 checkStrictly 将不生效
      if (props.single) {
        updateTreeStatusSingle(props.treeData, item)
        emit('update:checked', [item])
      }
      else {
        item.checked = !item.checked
        item.indeterminate = item.checked ? false : item.indeterminate

        // 受控情况下，会更新子节点的状态
        if (!props.checkStrictly) {
          updateTreeStatus(props.treeData, item, item.checked)
        }
        const checkeds = getAllCheckedNodes(props.treeData, props.mode)
        emit('update:checked', checkeds)
      }
    }

    const checkALl = () => {
      all.value = !all.value
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
    watch(() => props.treeData, () => {
      if (!props.checkStrictly && props.maxChecked !== -1 && (props.checked.length > props.maxChecked)) {
        throw new Error('父子节点非受控情况下，选中的节点数不能超过maxChecked')
      }
      props.checked.forEach((item) => {
        updateStatusByNode(props.treeData, item, true)
      })
      props.disabled.forEach((item) => {
        updateDisabledByNode(props.treeData, item, true)
      })
      leftData.value = props.treeData
    }, {
      immediate: true,
    })
    watch(() => props.searchValue, (val) => {
      if (val === '') {
        leftData.value = props.treeData
        return
      }
      const result: DNode[] = []
      traverseTree(props.treeData, (item) => {
        if (item.name.includes(val)) {
          result.push(item)
        }
      })
      leftData.value = result
    })
    return () => (
      <div class="dtd-d-tree-wrapper">
        <div class="dtd-d-tree-left">
          <DTreeNav v-model:navList={navList.value} />
          {(!props.single && props.maxChecked === -1) && (
            <div class='dtd-d-tree-left-all' onClick={checkALl}>
              <input name="all" type="checkbox" checked={all.value} />
              <label for="all"></label>
              <span>全选</span>
            </div>
          )}
          {(leftData.value.length > 0)
            ? <ul >{
              leftData.value.map((item) => {
                return (
                  <li class={item.disabled ? 'disabled' : ''}>
                    <div onClick={() => nodeClick2(item)} >
                      <input
                        name="logo"
                        type="checkbox"
                        checked={item.checked}
                        indeterminate={item.indeterminate}
                        />
                      <label for="logo"></label>
                      <Avatar style={{ marginLeft: '4px' }} src={item.avatar ?? imgUrl} alt={item.name}/>
                      <span style={{ whiteSpace: 'nowrap' }}>{item.name}</span>
                    </div>
                    {item.type === 0
                      ? <span onClick={() => updateLeftData(item)} style={{
                        color: all.value ? '#ccc' : '#1890ff',
                        whiteSpace: 'nowrap',
                      }}>下级</span>
                      : null}
                  </li>
                )
              })
            }</ul>
            : <div class="dtd-d-tree-empty">暂无数据</div>}
        </div>
        <div class="dtd-d-tree-right">
          <p>
            已选择：{props.checked.length ?? 0}
            {
              (props.checkStrictly && props.maxChecked !== -1) ? ` （最多选择${props.maxChecked}个）` : ''
            }
          </p>
          <ul>
            {props.checked.map((item) => {
              return (
                <li style={props.block ? { width: '100%' } : {}} onClick={() => cancelClick(item)}>
                  <Avatar src={item.avatar ?? imgUrl} width={24} alt={item.name} />
                  <span style={{ marginRight: '4px' }} >{item.name}</span>
                  <CloseIcon />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  },
})
