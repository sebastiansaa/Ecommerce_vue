<template>
  <div class="reviews-summary-desktop">
    <!-- Header con rating principal -->
    <header class="reviews-summary-desktop__header">
      <div class="reviews-summary-desktop__rating-display">
        <span class="reviews-summary-desktop__rating-number">{{ averageRating.toFixed(1) }}</span>
        <RatingStars :rating="averageRating" :max-rating="5" size="large" :show-value="false" />
      </div>
      <p class="reviews-summary-desktop__total">
        Basado en {{ totalReviews }} {{ totalReviews === 1 ? 'reseña' : 'reseñas' }}
      </p>
    </header>

    <!-- Distribución de ratings con barras -->
    <section class="reviews-summary-desktop__distribution">
      <h3 class="reviews-summary-desktop__distribution-title">Distribución de calificaciones</h3>

      <div class="reviews-summary-desktop__bars">
        <div
          v-for="rating in [5, 4, 3, 2, 1]"
          :key="rating"
          class="reviews-summary-desktop__bar-row"
        >
          <!-- Estrellas del rating -->
          <div class="reviews-summary-desktop__bar-label">
            <span class="reviews-summary-desktop__bar-rating">{{ rating }}</span>
            <svg class="reviews-summary-desktop__star-icon" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
          </div>

          <!-- Barra de progreso -->
          <div class="reviews-summary-desktop__bar-container">
            <div
              class="reviews-summary-desktop__bar-fill"
              :style="{
                width: `${getPercentage(ratingsDistribution[rating as keyof typeof ratingsDistribution])}%`,
              }"
            ></div>
          </div>

          <!-- Contador -->
          <span class="reviews-summary-desktop__bar-count">
            {{ ratingsDistribution[rating as keyof typeof ratingsDistribution] }}
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RatingStars } from '@/shared/components/ui/feedback'
import { REVIEWS_CONFIG } from '../../config/reviews.config'
import type { ReviewSummary } from '../interface'

interface Props {
  averageRating: number
  totalReviews: number
  ratingsDistribution: ReviewSummary['ratingsDistribution']
}

const props = defineProps<Props>()

// Computed para calcular porcentajes de las barras
const getPercentage = (count: number) => {
  if (props.totalReviews === 0) return 0
  return Math.round((count / props.totalReviews) * 100)
}
</script>

<style scoped>
.reviews-summary-desktop {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1.5rem;
  background-color: v-bind('REVIEWS_CONFIG.colors.background.card');
  border-radius: 0.75rem;
  border: 1px solid v-bind('REVIEWS_CONFIG.colors.border.light');
}

.reviews-summary-desktop__header {
  text-align: center;
}

.reviews-summary-desktop__rating-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.reviews-summary-desktop__rating-number {
  font-size: 3rem;
  font-weight: 700;
  color: v-bind('REVIEWS_CONFIG.colors.text.primary');
  line-height: 1;
}

.reviews-summary-desktop__total {
  font-size: 0.875rem;
  color: v-bind('REVIEWS_CONFIG.colors.text.secondary');
  margin: 0;
}

.reviews-summary-desktop__distribution-title {
  font-size: 1rem;
  font-weight: 600;
  color: v-bind('REVIEWS_CONFIG.colors.text.primary');
  margin: 0 0 1rem 0;
}

.reviews-summary-desktop__bars {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.reviews-summary-desktop__bar-row {
  display: grid;
  grid-template-columns: 60px 1fr 40px;
  align-items: center;
  gap: 0.75rem;
}

.reviews-summary-desktop__bar-label {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: v-bind('REVIEWS_CONFIG.colors.text.secondary');
}

.reviews-summary-desktop__bar-rating {
  font-weight: 500;
}

.reviews-summary-desktop__star-icon {
  width: 1rem;
  height: 1rem;
  color: v-bind('REVIEWS_CONFIG.stars.colors.filled');
}

.reviews-summary-desktop__bar-container {
  height: v-bind('REVIEWS_CONFIG.ratingBars.height');
  background-color: v-bind('REVIEWS_CONFIG.ratingBars.colors.background');
  border-radius: v-bind('REVIEWS_CONFIG.ratingBars.borderRadius');
  overflow: hidden;
  position: relative;
}

.reviews-summary-desktop__bar-fill {
  height: 100%;
  background-color: v-bind('REVIEWS_CONFIG.ratingBars.colors.filled');
  border-radius: v-bind('REVIEWS_CONFIG.ratingBars.borderRadius');
  transition: v-bind('REVIEWS_CONFIG.ratingBars.transition');
  min-width: 2px;
}

.reviews-summary-desktop__bar-count {
  font-size: 0.875rem;
  font-weight: 500;
  color: v-bind('REVIEWS_CONFIG.colors.text.secondary');
  text-align: right;
}
</style>
