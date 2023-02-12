<script setup lang="ts">
import { DButton, DModal } from 'hjxz-design'
import { ref } from 'vue';
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
  <DButton class="test" type="primary">Primary Button</DButton>
  <DButton>Default Button</DButton>
  <DButton type="danger">Danger Button</DButton>
  <DButton type="link">Link Button</DButton>
  <br>
  <DButton @click="handleClick" disabled type="primary">Primary Button</DButton>
  <DButton disabled>Default Button</DButton>
  <DButton disabled type="danger">Danger Button</DButton>
  <DButton disabled type="link">Link Button</DButton>
  <br>
  <DButton @click="handleClick">toggle</DButton>
  <DModal v-model:visible="visible" @ok="ok">
    test
  </DModal>
</template>

<style scoped>
.dtd-button {
  margin: 4px;
}
</style>
