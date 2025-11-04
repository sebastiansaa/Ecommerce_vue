<template>
  <div>
    <h2 class="greeting">Hola, {{ userName }}</h2>
    <div class="profile-grid">
      <div
        v-for="option in options"
        :key="option.key"
        class="profile-card"
        @click="$emit('select-option', option.key)"
      >
        <h3 class="profile-card-title">{{ option.label }}</h3>
        <p class="profile-card-description">{{ option.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/domain/auth/store/useAuthStore'
import { profileGridOptions } from './profileGridOptions'

const authStore = useAuthStore()
const userName = computed(() => authStore.user?.name || 'Usuario')
const options = profileGridOptions
</script>

<style scoped>
.greeting {
  font-size: 1.8rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 2rem;
  text-align: left;
  width: 100%;
  max-width: 800px;
}
.profile-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  width: 100%;
  max-width: 800px;
}
.profile-card {
  background: #f8fafc;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  padding: 2rem 1.5rem;
  text-align: left;
  cursor: pointer;
  transition:
    box-shadow 0.2s,
    background 0.2s,
    transform 0.2s;
}
.profile-card:hover {
  background: #e6f0fa;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}
.profile-card-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}
.profile-card-description {
  font-size: 0.95rem;
  color: #64748b;
  margin: 0;
  line-height: 1.4;
}
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
@media (max-width: 768px) {
  .greeting {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
  .profile-grid {
    grid-template-columns: 1fr;
  }
}
</style>
