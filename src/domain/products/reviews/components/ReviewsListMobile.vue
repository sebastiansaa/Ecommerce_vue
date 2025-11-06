<template>
  <div class="reviews-list-mobile">
    <!-- Header compacto -->
    <header class="reviews-list-mobile__header">
      <h2 class="reviews-list-mobile__title">Reseñas ({{ totalReviews }})</h2>

      <!-- Filtro simple para mobile -->
      <div class="reviews-list-mobile__filters">
        <select v-model="sortBy" class="reviews-list-mobile__sort-select">
          <option value="newest">Recientes</option>
          <option value="highest">Mejor valoradas</option>
          <option value="lowest">Peor valoradas</option>
        </select>
      </div>
    </header>

    <!-- Lista compacta -->
    <main class="reviews-list-mobile__content">
      <div class="reviews-list-mobile__list">
        <ReviewItem
          v-for="review in reviews"
          :key="review.id"
          :review="review"
          :compact="true"
          class="reviews-list-mobile__item"
        />
      </div>

      <!-- Botón cargar más compacto -->
      <footer class="reviews-list-mobile__footer" v-if="hasMoreReviews">
        <BaseProductButton
          @click="onLoadMore"
          :disabled="isLoading"
          customClass="reviews-list-mobile__load-more"
        >
          <span v-if="!isLoading">Ver más</span>
          <span v-else class="reviews-list-mobile__loading">
            <svg class="reviews-list-mobile__spinner" viewBox="0 0 24 24">
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
        </BaseProductButton>
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { REVIEWS_CONFIG } from '../../config/reviews.config'
import ReviewItem from './ReviewItem.vue'
import type { Review } from '../interface'
import { BaseProductButton } from '@/shared/components/ui/actions/buttons'

interface Props {
  reviews: Review[]
  totalReviews: number
  isLoading: boolean
  onLoadMore?: () => void
}

const props = defineProps<Props>()

// State local para filtros (simplificado para mobile)
const sortBy = ref<string>('newest')

// Computed
const hasMoreReviews = computed(() => {
  return props.reviews.length < props.totalReviews
})
</script>

<style scoped>
.reviews-list-mobile {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.reviews-list-mobile__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background-color: v-bind('REVIEWS_CONFIG.colors.background.section');
  border-radius: 0.5rem;
  border: 1px solid v-bind('REVIEWS_CONFIG.colors.border.light');
}

.reviews-list-mobile__title {
  font-size: 1rem;
  font-weight: 600;
  color: v-bind('REVIEWS_CONFIG.colors.text.primary');
  margin: 0;
}

.reviews-list-mobile__filters {
  display: flex;
}

.reviews-list-mobile__sort-select {
  padding: 0.375rem 0.75rem;
  border: 1px solid v-bind('REVIEWS_CONFIG.colors.border.light');
  border-radius: 0.25rem;
  background-color: white;
  font-size: 0.75rem;
  color: v-bind('REVIEWS_CONFIG.colors.text.primary');
  cursor: pointer;
  min-width: 120px;
}

.reviews-list-mobile__sort-select:focus {
  outline: none;
  border-color: #3b82f6;
}

.reviews-list-mobile__content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.reviews-list-mobile__list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.reviews-list-mobile__footer {
  display: flex;
  justify-content: center;
  padding: 0.75rem;
}

.reviews-list-mobile__load-more {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  width: 100%;
  max-width: 200px;
  padding: 0.75rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reviews-list-mobile__load-more:hover:not(:disabled) {
  background-color: #2563eb;
}

.reviews-list-mobile__load-more:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.reviews-list-mobile__loading {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.reviews-list-mobile__spinner {
  width: 0.875rem;
  height: 0.875rem;
  color: currentColor;
}
</style>
