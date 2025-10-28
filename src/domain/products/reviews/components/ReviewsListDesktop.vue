<template>
  <div class="reviews-list-desktop">
    <!-- Header de la lista -->
    <header class="reviews-list-desktop__header">
      <h2 class="reviews-list-desktop__title">Reseñas de clientes ({{ totalReviews }})</h2>

      <!-- Filtros y ordenamiento -->
      <div class="reviews-list-desktop__filters">
        <select v-model="sortBy" class="reviews-list-desktop__sort-select">
          <option value="newest">Más recientes</option>
          <option value="oldest">Más antiguas</option>
          <option value="highest">Mayor calificación</option>
          <option value="lowest">Menor calificación</option>
          <option value="helpful">Más útiles</option>
        </select>

        <select v-model="filterRating" class="reviews-list-desktop__filter-select">
          <option value="">Todas las calificaciones</option>
          <option value="5">5 estrellas</option>
          <option value="4">4 estrellas</option>
          <option value="3">3 estrellas</option>
          <option value="2">2 estrellas</option>
          <option value="1">1 estrella</option>
        </select>
      </div>
    </header>

    <!-- Lista de reviews -->
    <main class="reviews-list-desktop__content">
      <div class="reviews-list-desktop__grid">
        <ReviewItem
          v-for="review in reviews"
          :key="review.id"
          :review="review"
          class="reviews-list-desktop__item"
        />
      </div>

      <!-- Botón cargar más -->
      <footer class="reviews-list-desktop__footer" v-if="hasMoreReviews">
        <button @click="onLoadMore" :disabled="isLoading" class="reviews-list-desktop__load-more">
          <span v-if="!isLoading">Cargar más reseñas</span>
          <span v-else class="reviews-list-desktop__loading">
            <svg class="reviews-list-desktop__spinner" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
                fill="none"
                stroke-dasharray="31.416"
                stroke-dashoffset="31.416"
              >
                <animate
                  attributeName="stroke-dasharray"
                  dur="2s"
                  values="0 31.416;15.708 15.708;0 31.416;0 31.416"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-dashoffset"
                  dur="2s"
                  values="0;-15.708;-31.416;-31.416"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
            Cargando...
          </span>
        </button>
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { REVIEWS_CONFIG } from '../../config/reviews.config'
import ReviewItem from './ReviewItem.vue'
import type { Review } from '../interface'

interface Props {
  reviews: Review[]
  totalReviews: number
  isLoading: boolean
  onLoadMore?: () => void
}

const props = defineProps<Props>()

// State local para filtros
const sortBy = ref<string>('newest')
const filterRating = ref<string>('')

// Computed
const hasMoreReviews = computed(() => {
  return props.reviews.length < props.totalReviews
})
</script>

<style scoped>
.reviews-list-desktop {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.reviews-list-desktop__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid v-bind('REVIEWS_CONFIG.colors.border.light');
}

.reviews-list-desktop__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: v-bind('REVIEWS_CONFIG.colors.text.primary');
  margin: 0;
}

.reviews-list-desktop__filters {
  display: flex;
  gap: 1rem;
}

.reviews-list-desktop__sort-select,
.reviews-list-desktop__filter-select {
  padding: 0.5rem 1rem;
  border: 1px solid v-bind('REVIEWS_CONFIG.colors.border.light');
  border-radius: 0.375rem;
  background-color: white;
  font-size: 0.875rem;
  color: v-bind('REVIEWS_CONFIG.colors.text.primary');
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.reviews-list-desktop__sort-select:hover,
.reviews-list-desktop__filter-select:hover {
  border-color: v-bind('REVIEWS_CONFIG.colors.border.medium');
}

.reviews-list-desktop__sort-select:focus,
.reviews-list-desktop__filter-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.reviews-list-desktop__content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.reviews-list-desktop__grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.reviews-list-desktop__footer {
  display: flex;
  justify-content: center;
  padding-top: 1rem;
}

.reviews-list-desktop__load-more {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reviews-list-desktop__load-more:hover:not(:disabled) {
  background-color: #2563eb;
  transform: translateY(-1px);
}

.reviews-list-desktop__load-more:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.reviews-list-desktop__loading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.reviews-list-desktop__spinner {
  width: 1rem;
  height: 1rem;
  color: currentColor;
}
</style>
