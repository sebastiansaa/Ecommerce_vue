<template>
  <div class="profile-details-section">
    <button class="back-btn-outline" @click="$emit('back')">
      <ArrowLeftIcon class="icon" />
      Volver
    </button>
    <component :is="detailComponent" />
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'
import { profileGridOptions } from './profileGridOptions'

const props = defineProps<{ selectedKey: string | null }>()

const detailComponent = computed(() => {
  if (!props.selectedKey) return null
  const found = profileGridOptions.find((opt) => opt.key === props.selectedKey)
  return found ? found.component : null
})
</script>

<style scoped>
.profile-details-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.back-btn-outline {
  margin-bottom: 1.5rem;
  background: none;
  border: 2px solid #2d6cdf;
  color: #2d6cdf;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 1.2rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: border-color 0.2s;
}
.back-btn-outline:hover {
  border-color: #1e40af;
}
.icon {
  width: 1.2em;
  height: 1.2em;
}
</style>

<script setup lang="ts"></script>

<style scoped></style>
