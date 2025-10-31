<template>
  <button
    type="button"
    @click="toggleVisibility"
    tabindex="-1"
    :aria-label="isVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'"
    class="password-toggle-btn"
  >
    <span v-if="!isVisible">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#888"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <ellipse cx="12" cy="12" rx="8" ry="5" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    </span>
    <span v-else>
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#888"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <ellipse cx="12" cy="12" rx="8" ry="5" />
        <circle cx="12" cy="12" r="2.5" />
        <line x1="4" y1="20" x2="20" y2="4" />
      </svg>
    </span>
  </button>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  isVisible: { type: Boolean, required: true },
  toggleVisibility: { type: Function as PropType<() => void>, required: true },
})
</script>

<style scoped>
.password-toggle-btn {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  height: 100%;
}

.password-toggle-btn:hover svg {
  stroke: #555;
}

.password-toggle-btn:focus {
  outline: none;
}
</style>
