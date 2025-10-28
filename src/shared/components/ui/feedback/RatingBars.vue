<template>
  <div class="rating-bars">
    <div v-for="rating in ratings" :key="rating.stars" class="rating-bars__row">
      <!-- Estrellas y label -->
      <div class="rating-bars__label">
        <span class="rating-bars__stars">{{ rating.stars }}</span>
        <svg viewBox="0 0 24 24" fill="currentColor" class="rating-bars__star-icon">
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          />
        </svg>
      </div>

      <!-- Barra de progreso -->
      <div class="rating-bars__bar-container">
        <div
          class="rating-bars__bar"
          :style="{
            width: `${rating.percentage}%`,
            transitionDelay: `${(5 - rating.stars) * 100}ms`,
          }"
        />
      </div>

      <!-- Contador opcional -->
      <div v-if="showCount" class="rating-bars__count">
        {{ rating.count }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { REVIEWS_CONFIG } from '@/domain/products/config'

// Props
interface Props {
  distribution: Record<1 | 2 | 3 | 4 | 5, number>
  showCount?: boolean
  animated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showCount: false,
  animated: true,
})

// State
const isVisible = ref(false)

// Computed
const totalReviews = computed(() => {
  return Object.values(props.distribution).reduce((sum, count) => sum + count, 0)
})

const ratings = computed(() => {
  return [5, 4, 3, 2, 1].map((stars) => {
    const count = props.distribution[stars as keyof typeof props.distribution] || 0
    const percentage = totalReviews.value > 0 ? (count / totalReviews.value) * 100 : 0

    return {
      stars,
      count,
      percentage: isVisible.value ? percentage : 0,
    }
  })
})

// Lifecycle
onMounted(() => {
  if (props.animated) {
    setTimeout(() => {
      isVisible.value = true
    }, 100)
  } else {
    isVisible.value = true
  }
})
</script>

<style scoped>
.rating-bars {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: v-bind('REVIEWS_CONFIG.ratingBars.maxWidth');
}

.rating-bars__row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.rating-bars__label {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  min-width: 2rem;
  flex-shrink: 0;
}

.rating-bars__stars {
  font-size: 0.875rem;
  font-weight: 500;
  color: v-bind('REVIEWS_CONFIG.colors.text.secondary');
}

.rating-bars__star-icon {
  width: 12px;
  height: 12px;
  color: v-bind('REVIEWS_CONFIG.stars.colors.filled');
}

.rating-bars__bar-container {
  flex: 1;
  height: v-bind('REVIEWS_CONFIG.ratingBars.height');
  background-color: v-bind('REVIEWS_CONFIG.ratingBars.colors.background');
  border-radius: v-bind('REVIEWS_CONFIG.ratingBars.borderRadius');
  overflow: hidden;
  position: relative;
}

.rating-bars__bar {
  height: 100%;
  background-color: v-bind('REVIEWS_CONFIG.ratingBars.colors.filled');
  border-radius: v-bind('REVIEWS_CONFIG.ratingBars.borderRadius');
  transition: width v-bind('REVIEWS_CONFIG.animations.barsGrow');
  transition-timing-function: ease-out;
}

.rating-bars__count {
  min-width: 2rem;
  text-align: right;
  font-size: 0.75rem;
  color: v-bind('REVIEWS_CONFIG.colors.text.muted');
  flex-shrink: 0;
}

/* Efectos hover para toda la fila */
.rating-bars__row:hover .rating-bars__bar {
  background-color: #2563eb; /* Un poco más oscuro que el azul base */
}

.rating-bars__row:hover .rating-bars__stars {
  color: v-bind('REVIEWS_CONFIG.colors.text.primary');
}

/* Responsivo */
/* Desktop: ancho máximo completo y más amplio */
@media (min-width: 1024px) {
  .rating-bars {
    max-width: v-bind('REVIEWS_CONFIG.ratingBars.maxWidth');
    width: 100%;
  }

  .rating-bars__row {
    gap: 1rem;
  }
}

/* Tablet: ancho intermedio para aprovechar espacio */
@media (min-width: 768px) and (max-width: 1023px) {
  .rating-bars {
    max-width: 350px;
    width: 100%;
  }

  .rating-bars__row {
    gap: 1rem;
  }
}

/* Mobile: más amplio que antes */
@media (max-width: 767px) {
  .rating-bars {
    max-width: 280px;
    width: 100%;
  }

  .rating-bars__row {
    gap: 0.75rem;
  }

  .rating-bars__label {
    min-width: 1.5rem;
  }

  .rating-bars__count {
    min-width: 1.5rem;
    font-size: 0.7rem;
  }
}
</style>
