<template>
  <div class="search-history">
    <div class="search-history__header">
      <h3 class="search-history__title">Búsquedas recientes</h3>
    </div>

    <ul class="search-history__list">
      <li v-for="item in history" :key="item.id" class="search-history__item">
        <button class="search-history__button" @click="$emit('select', item.term)">
          <span class="search-history__icon">🕒</span>
          <span class="search-history__text">{{ item.term }}</span>
        </button>

        <IconButton
          class="search-history__remove"
          aria-label="Eliminar del historial"
          @click.stop="$emit('remove', item.id)"
        >
          ✕
        </IconButton>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { IconButton } from '@/shared/components/ui/actions/buttons'
import type { SearchHistoryItem } from '../interface'

defineProps<{
  history: SearchHistoryItem[]
}>()

defineEmits<{
  select: [term: string]
  remove: [id: string]
}>()
</script>

<style scoped>
.search-history {
  padding: 1rem;
}

.search-history__header {
  margin-bottom: 0.75rem;
}

.search-history__title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #666;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.search-history__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.search-history__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.search-history__item:last-child {
  border-bottom: none;
}

.search-history__button {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  text-align: left;
  border-radius: 8px;
  transition: background 0.2s;
}

.search-history__button:hover {
  background: #f5f5f5;
}

.search-history__icon {
  font-size: 1rem;
  color: #999;
}

.search-history__text {
  flex: 1;
  font-size: 0.95rem;
  color: #333;
}

.search-history__remove {
  font-size: 1.25rem;
  color: #ccc;
  opacity: 0;
  transition: opacity 0.2s;
}

.search-history__item:hover .search-history__remove {
  opacity: 1;
}

.search-history__remove:hover {
  color: #ff5252;
}
</style>
