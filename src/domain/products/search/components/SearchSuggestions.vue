<template>
  <div class="search-suggestions">
    <div v-if="loading" class="search-suggestions__loading">
      <span>Buscando...</span>
    </div>

    <ul v-else class="search-suggestions__list">
      <li v-for="suggestion in suggestions" :key="suggestion.id" class="search-suggestions__item">
        <button class="search-suggestions__button" @click="$emit('select', suggestion.text)">
          <span class="search-suggestions__icon">
            {{
              suggestion.type === 'product' ? '📦' : suggestion.type === 'category' ? '🏷️' : '🕒'
            }}
          </span>
          <span class="search-suggestions__text">{{ suggestion.text }}</span>
          <span class="search-suggestions__type">
            {{
              suggestion.type === 'product'
                ? 'Producto'
                : suggestion.type === 'category'
                  ? 'Categoría'
                  : 'Reciente'
            }}
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { SearchSuggestion } from '../interface'

defineProps<{
  suggestions: SearchSuggestion[]
  loading?: boolean
}>()

defineEmits<{
  select: [text: string]
}>()
</script>

<style scoped>
.search-suggestions {
  padding: 0.5rem;
}

.search-suggestions__loading {
  padding: 1.5rem;
  text-align: center;
  color: #999;
  font-size: 0.9rem;
}

.search-suggestions__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.search-suggestions__item {
  margin: 0;
}

.search-suggestions__button {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: none;
  border: none;
  padding: 0.75rem 1rem;
  cursor: pointer;
  text-align: left;
  border-radius: 8px;
  transition: background 0.2s;
}

.search-suggestions__button:hover {
  background: #f5f5f5;
}

.search-suggestions__icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.search-suggestions__text {
  flex: 1;
  font-size: 0.95rem;
  color: #333;
  font-weight: 500;
}

.search-suggestions__type {
  font-size: 0.8rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .search-suggestions__button {
    padding: 0.6rem 0.75rem;
  }

  .search-suggestions__text {
    font-size: 0.9rem;
  }

  .search-suggestions__type {
    display: none;
  }
}
</style>
