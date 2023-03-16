import { defineComponent, ref, shallowRef } from 'vue'
import type { ApiType } from '../components/Api'
import { Api } from '../components/Api'
import type { DemoType } from '../components/Demo'
import { Demo } from '../components/Demo'
import { Wrapper } from '../components/Wrapper'

import UserTree from '../demo-code/UserTree.vue'

export const TreeDemo = defineComponent({
  name: 'TreeDemo',
  setup() {
    const demoList = ref<DemoType[]>([
      {
        codeVisible: false,
        title: '选择人员',
        component: shallowRef(UserTree),
      },
    ])
    const apiList = ref<ApiType[]>([
      {
        attr: 'treeData',
        type: 'DNode[]',
        notes: '数据源,DNode类型包含{id:string,name:string,children?:DNode[],type:0|1}',
        optionalValue: '--',
        default: '[]',
      },
      {
        attr: 'checked',
        type: 'DNode[]',
        notes: '选中的节点',
        optionalValue: '--',
        default: '[]',
      },
      {
        attr: 'disabled',
        type: 'DNode[]',
        notes: '禁用的节点',
        optionalValue: '--',
        default: '[]',
      },
      {
        attr: 'single',
        type: 'boolean',
        notes: '是否是单选',
        optionalValue: 'true/false',
        default: 'false',
      },
      {
        attr: 'mode',
        type: '0/1',
        notes: '0:选部门，1:选人',
        optionalValue: '0|1',
        default: '1',
      },
      {
        attr: 'block',
        type: 'boolean',
        notes: '右侧列表是否块级元素',
        optionalValue: 'true/false',
        default: 'false',
      },
      {
        attr: 'checkStrictly',
        type: 'boolean',
        notes: '父子节点是否关联',
        optionalValue: 'true/false',
        default: 'false',
      },
      {
        attr: 'maxChecked',
        type: 'number',
        notes: '可选的最大节点数，-1表示不限制。只有在非受控情况下才生效',
        optionalValue: '--',
        default: '-1',
      },
    ])
    return () => (
      <Wrapper>
        <Demo title="树形组件 Tree" demoList={demoList.value} />
        <Api apiList={apiList.value} />
      </Wrapper>
    )
  },
})
