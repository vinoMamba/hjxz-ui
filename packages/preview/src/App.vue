<script setup lang="ts">
import { ref } from 'vue'
import type { DNode } from '../../ui/src/index'
import { DButton, DModal, DTree } from '../../ui/src/index'
import { treeData } from './user.data'

const checked = ref<DNode[]>([
  {
    id: '0-0-3',
    name: '人员-1-4',
    type: 1,
  },
  { id: '0-7', name: '人员-4', type: 1 },
])
const data = ref<DNode[]>()
setTimeout(() => {
  data.value = treeData
}, 3000)
const visible = ref(false)
const handleClick = () => {
  visible.value = true
}
const ok = (e: MouseEvent) => {
  console.log(e)
  setTimeout(() => {
    visible.value = false
  }, 1000)
}
</script>

<template>
  <h1>hjxz-design</h1>
  <input type="checkbox" checked />
  <!-- checked: {{ checked }} -->
  <!-- <hr> -->
  <!-- data: {{ data }} -->
  <DTree v-model:checked="checked" :tree-data="data" />
  <br>
  <DButton @click="handleClick">
    toggle
  </DButton>
  <DModal v-model:visible="visible" @ok="ok">
    <template #content>
      <div class="wrapper">
        <DTree v-model:checked="checked" :tree-data="data" />
      </div>
    </template>
</DModal>
</template>

<style scoped>
.dtd-button {
  margin: 4px;
}

.wrapper {
  width: 40vw;
}
</style>
