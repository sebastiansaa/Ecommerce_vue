<template>
  <div>
    <div class="profile-grid" v-if="!selected">
      <ProfileGrid @select-option="handleSelect" />
    </div>
    <ProfileDetailsSection v-else :selected="selected" @back="selected = null" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProfileGrid from './ProfileGrid.vue'
import ProfileDetailsSection from './ProfileDetailsSection.vue'

const selected = ref<string | null>(null)

function handleSelect(key: string) {
  selected.value = key
}
</script>

<style scoped>
.back-btn {
  margin-bottom: 1.5rem;
  background: none;
  border: none;
  color: #2d6cdf;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: background 0.2s;
}
.back-btn:hover {
  background: #f0f4fa;
}
</style>
