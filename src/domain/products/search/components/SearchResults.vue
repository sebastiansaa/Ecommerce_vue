<template>
  <div class="search-results">
    <div class="search-results__header">
      <h2 class="search-results__title">Resultados de búsqueda</h2>
      <p v-if="!loading && results.length > 0" class="search-results__count">
        {{ results.length }}
        {{ results.length === 1 ? 'producto encontrado' : 'productos encontrados' }}
      </p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="search-results__loading">
      <div class="search-results__spinner">🔄</div>
      <p>Buscando productos...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="search-results__error">
      <span class="search-results__error-icon">⚠️</span>
      <p>{{ error }}</p>
    </div>

    <!-- Empty -->
    <div v-else-if="results.length === 0" class="search-results__empty">
      <span class="search-results__empty-icon">🔍</span>
      <h3>No se encontraron productos</h3>
      <p>Intenta con otros términos de búsqueda</p>
    </div>

    <!-- Results Grid -->
    <div v-else class="search-results__grid">
      <article v-for="product in results" :key="product.id" class="search-results__card">
        <div class="search-results__image-wrapper">
          <img
            :src="product.images[0]"
            :alt="product.title"
            class="search-results__image"
            @error="handleImageError"
          />
        </div>

        <div class="search-results__info">
          <h3 class="search-results__product-title">{{ product.title }}</h3>
          <p class="search-results__category">{{ product.category.name }}</p>
          <p class="search-results__price">${{ product.price.toLocaleString() }}</p>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { SearchResult } from '../interface'

defineProps<{
  results: SearchResult[]
  loading?: boolean
  error?: string | null
}>()

defineEmits<{
  close: []
}>()

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'https://via.placeholder.com/300x300?text=Sin+Imagen'
}
</script>

<style scoped>
.search-results {
  min-height: 300px;
  max-height: 70vh;
  overflow-y: auto;
}

.search-results__header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.search-results__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #222;
  margin: 0 0 0.5rem 0;
}

.search-results__count {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}

/* Loading state */
.search-results__loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  color: #666;
}

.search-results__spinner {
  font-size: 3rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Error state */
.search-results__error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  color: #d32f2f;
}

.search-results__error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

/* Empty state */
.search-results__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  color: #666;
}

.search-results__empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.search-results__empty h3 {
  font-size: 1.25rem;
  margin: 0 0 0.5rem 0;
  color: #333;
}

.search-results__empty p {
  margin: 0;
  font-size: 0.95rem;
}

/* Results Grid */
.search-results__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

.search-results__card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.search-results__card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.search-results__image-wrapper {
  position: relative;
  width: 100%;
  padding-top: 100%;
  background: #f5f5f5;
  overflow: hidden;
}

.search-results__image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.search-results__info {
  padding: 0.75rem;
}

.search-results__product-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #222;
  margin: 0 0 0.25rem 0;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.search-results__category {
  font-size: 0.8rem;
  color: #999;
  margin: 0 0 0.5rem 0;
}

.search-results__price {
  font-size: 1.1rem;
  font-weight: 700;
  color: #ff9800;
  margin: 0;
}

@media (max-width: 768px) {
  .search-results__grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 0.75rem;
  }
}
</style>
