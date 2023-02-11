<script setup lang="ts">
import { DButton } from 'hjxz-design'
</script>

<template>
  <h1>hjxz-design</h1>
  <DButton class="test" type="primary">Primary Button</DButton>
  <DButton>Default Button</DButton>
  <DButton type="danger">Danger Button</DButton>
  <DButton type="link">Link Button</DButton>
</template>

<style scoped>
.dtd-button {
  margin: 4px;
}
</style>
