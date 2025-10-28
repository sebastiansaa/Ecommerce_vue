<template>
  <div class="reviews-summary-mobile">
    <!-- Diseño compacto y centrado para mobile -->
    <div class="reviews-summary-mobile__container">
      <!-- Rating principal centrado -->
      <header class="reviews-summary-mobile__header">
        <div class="reviews-summary-mobile__rating-display">
          <span class="reviews-summary-mobile__rating-number">{{ averageRating.toFixed(1) }}</span>
          <RatingStars :rating="averageRating" :max-rating="5" size="medium" :show-value="false" />
          <p class="reviews-summary-mobile__total">
            {{ totalReviews }} {{ totalReviews === 1 ? 'reseña' : 'reseñas' }}
          </p>
        </div>
      </header>

      <!-- Distribución compacta -->
      <section class="reviews-summary-mobile__distribution">
        <div class="reviews-summary-mobile__bars">
          <div
            v-for="rating in [5, 4, 3, 2, 1]"
            :key="rating"
            class="reviews-summary-mobile__bar-row"
          >
            <!-- Label compacto -->
            <div class="reviews-summary-mobile__bar-label">
              <span class="reviews-summary-mobile__bar-rating">{{ rating }}</span>
              <svg
                class="reviews-summary-mobile__star-icon"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </div>

            <!-- Barra más pequeña -->
            <div class="reviews-summary-mobile__bar-container">
              <div
                class="reviews-summary-mobile__bar-fill"
                :style="{
                  width: `${getPercentage(ratingsDistribution[rating as keyof typeof ratingsDistribution])}%`,
                }"
              ></div>
            </div>

            <!-- Contador -->
            <span class="reviews-summary-mobile__bar-count">
              {{ ratingsDistribution[rating as keyof typeof ratingsDistribution] }}
            </span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
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
.reviews-summary-mobile {
  width: 100%;
}

.reviews-summary-mobile__container {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1rem;
  background-color: v-bind('REVIEWS_CONFIG.colors.background.card');
  border-radius: 0.5rem;
  border: 1px solid v-bind('REVIEWS_CONFIG.colors.border.light');
}

.reviews-summary-mobile__header {
  text-align: center;
}

.reviews-summary-mobile__rating-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
}

.reviews-summary-mobile__rating-number {
  font-size: 2.25rem;
  font-weight: 700;
  color: v-bind('REVIEWS_CONFIG.colors.text.primary');
  line-height: 1;
}

.reviews-summary-mobile__total {
  font-size: 0.75rem;
  color: v-bind('REVIEWS_CONFIG.colors.text.secondary');
  margin: 0;
  margin-top: 0.25rem;
}

.reviews-summary-mobile__bars {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.reviews-summary-mobile__bar-row {
  display: grid;
  grid-template-columns: 40px 1fr 30px;
  align-items: center;
  gap: 0.5rem;
}

.reviews-summary-mobile__bar-label {
  display: flex;
  align-items: center;
  gap: 0.125rem;
  font-size: 0.75rem;
  color: v-bind('REVIEWS_CONFIG.colors.text.secondary');
}

.reviews-summary-mobile__bar-rating {
  font-weight: 500;
}

.reviews-summary-mobile__star-icon {
  width: 0.75rem;
  height: 0.75rem;
  color: v-bind('REVIEWS_CONFIG.stars.colors.filled');
}

.reviews-summary-mobile__bar-container {
  height: 12px;
  background-color: v-bind('REVIEWS_CONFIG.ratingBars.colors.background');
  border-radius: 6px;
  overflow: hidden;
  position: relative;
}

.reviews-summary-mobile__bar-fill {
  height: 100%;
  background-color: v-bind('REVIEWS_CONFIG.ratingBars.colors.filled');
  border-radius: 6px;
  transition: v-bind('REVIEWS_CONFIG.ratingBars.transition');
  min-width: 1px;
}

.reviews-summary-mobile__bar-count {
  font-size: 0.75rem;
  font-weight: 500;
  color: v-bind('REVIEWS_CONFIG.colors.text.secondary');
  text-align: right;
}
</style>
