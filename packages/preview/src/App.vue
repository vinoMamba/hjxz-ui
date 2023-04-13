<script setup lang="ts">
import { ref } from 'vue'
import type { DNode } from '../../ui/src/index'
import { DButton, DModal, DTree } from '../../ui/src/index'
import { treeData } from './user.data'

const checked = ref<DNode[]>([])
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
  <input type="checkbox" checked>
  <br>
  <DButton @click="handleClick">
    toggle
  </DButton>
  <DModal v-model:visible="visible" @ok="ok">
    <template #content>
      <div class="wrapper">
        <DTree v-model:checked="checked" :mode="0" :tree-data="data"  check-strictly />
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
