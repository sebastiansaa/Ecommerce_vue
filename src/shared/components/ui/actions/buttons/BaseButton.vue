<template>
  <button :type="type" :class="['base-btn', customClass]" @click="onClick">
    <slot />
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  type: { type: String, default: 'button' },
  customClass: { type: String, default: '' },
})
const emit = defineEmits(['click'])

function onClick(event) {
  emit('click', event)
}
</script>

<style scoped>
.base-btn {
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  color: #222;
  font-weight: 500;
  transition: background 0.2s;
}
.base-btn:hover {
  background: #f0f0f0;
}
</style>
