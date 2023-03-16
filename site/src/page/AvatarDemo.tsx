import { defineComponent, ref, shallowRef } from 'vue'
import type { ApiType } from '../components/Api'
import { Api } from '../components/Api'
import type { DemoType } from '../components/Demo'
import { Demo } from '../components/Demo'
import { Wrapper } from '../components/Wrapper'

import Avatar from '../demo-code/Avatar.vue'

export const AvatarDemo = defineComponent({
  name: 'AvatarDemo ',
  setup() {
    const demoList = ref<DemoType[]>([
      {
        codeVisible: false,
        title: '设置头像，这里只允许添加url',
        component: shallowRef(Avatar),
      },
    ])
    const apiList = ref<ApiType[]>([
      {
        attr: 'url',
        type: 'String',
        notes: '图像的地址',
        optionalValue: '--',
        default: '',
      },
    ])
    return () => (
      <Wrapper>
        <Demo title="头像 Avatar" demoList={demoList.value} />
        <Api apiList={apiList.value} />
      </Wrapper>
    )
  },
})
