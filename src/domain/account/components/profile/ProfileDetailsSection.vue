<template>
  <div class="profile-details-section">
    <div class="profile-actions">
      <BaseAccountButton @click="$emit('back')">
        <ArrowLeftIcon class="icon" />
        Volver
      </BaseAccountButton>
      <slot name="action" />
    </div>
    <component :is="detailComponent" />
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'
import { profileGridOptions } from './profileGridOptions'
import { BaseAccountButton } from '@/shared/components/ui/actions/buttons'

const props = defineProps<{ selected: string | null }>()

const detailComponent = computed(() => {
  if (!props.selected) return null
  const found = profileGridOptions.find((opt) => opt.key === props.selected)
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
.profile-actions {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.edit-btn-outline {
  background: none;
  border: 2px solid #22c55e;
  color: #22c55e;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 1.2rem;
  border-radius: 0.5rem;
  transition: border-color 0.2s;
}
.edit-btn-outline:hover {
  border-color: #16a34a;
}
.icon {
  width: 1.2em;
  height: 1.2em;
}
</style>

<script setup lang="ts"></script>

<style scoped></style>
