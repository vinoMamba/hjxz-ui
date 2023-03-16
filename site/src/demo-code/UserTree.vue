<script lang="ts" setup>
import type { DNode } from 'hjxz-design'
import { DButton, DModal, DTree, createTree } from 'hjxz-design'
import { ref } from 'vue'
const apiData: DNode[] = [
  {
    id: '1',
    name: '安徽网钉企业服务中心',
    type: 0,
    peopleCount: 184,
    avatar: null,
    position: null,
    parentId: '0',
    parentIds: '',
  },
  {
    id: '1523843025500958722',
    name: '小王',
    type: 1,
    peopleCount: null,
    avatar: 'https://static-legacy.dingtalk.com/media/lALPDefR612GESjNA-jNA-g_1000_1000.png',
    position: null,
    parentId: '1',
    parentIds: ',1',
  },
  {
    id: '1615900788735410177',
    name: '曹操',
    type: 1,
    peopleCount: null,
    avatar: 'https://static-legacy.dingtalk.com/media/lALPDefR612GESjNA-jNA-g_1000_1000.png',
    position: null,
    parentId: '1',
    parentIds: ',1',
  },
  {
    id: '1605374842396815362',
    name: '关羽',
    type: 1,
    peopleCount: null,
    avatar: 'https://static-legacy.dingtalk.com/media/lALPDefR612GESjNA-jNA-g_1000_1000.png',
    position: null,
    parentId: '1',
    parentIds: '1',
  },

  {
    id: '1544133169577054210',
    name: '云长',
    type: 1,
    peopleCount: null,
    avatar: 'https://static-legacy.dingtalk.com/media/lALPDefR612GESjNA-jNA-g_1000_1000.png',
    position: null,
    parentId: '1539422879365525505',
  },
  {
    id: '1539422879365525505',
    name: '部门-2',
    type: 0,
    peopleCount: null,
    position: null,
    parentId: '1',
  },
  {
    id: '1613842012368863233',
    name: '部门-1',
    type: 0,
    peopleCount: null,
    avatar: null,
    position: null,
    parentId: '1',
  },
]
const checked = ref<DNode[]>([])
const data = ref<DNode[]>([])
setTimeout(() => {
  const treeData = createTree(apiData)
  data.value = treeData
}, 3000)
const visible = ref(false)
</script>

<template>
  <DButton @click="visible = true">
    toggle
  </DButton>
  <DModal v-model:visible="visible" @ok="visible = false">
    <template #content>
      <div class="w[40vw]">
        <DTree v-model:checked="checked" :tree-data="data" />
      </div>
    </template>
  </DModal>
</template>
