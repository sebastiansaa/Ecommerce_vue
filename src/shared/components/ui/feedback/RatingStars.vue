<template>
  <div class="rating-stars" :class="`rating-stars--${size}`">
    <span
      v-for="star in maxRating"
      :key="star"
      class="rating-stars__star"
      :class="{
        'rating-stars__star--filled': star <= filledStars,
        'rating-stars__star--half': star === halfStar,
        'rating-stars__star--interactive': interactive,
      }"
      @click="handleStarClick(star)"
      @mouseenter="handleStarHover(star)"
      @mouseleave="handleStarLeave"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" class="rating-stars__icon">
        <defs>
          <linearGradient :id="`half-${componentId}-${star}`">
            <stop offset="50%" :stop-color="starColors.filled" />
            <stop offset="50%" :stop-color="starColors.empty" />
          </linearGradient>
        </defs>
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          :fill="getStarFill(star)"
        />
      </svg>
    </span>

    <!-- Mostrar valor numérico si se especifica -->
    <span v-if="showValue" class="rating-stars__value">
      {{ formatValue(rating) }}{{ showMaxValue ? `/${maxRating}` : '' }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { REVIEWS_CONFIG, type StarSize } from '@/domain/products/config'

// Props
interface Props {
  rating: number
  maxRating?: number
  size?: StarSize
  interactive?: boolean
  showValue?: boolean
  showMaxValue?: boolean
  precision?: 'full' | 'half' | 'quarter'
}

const props = withDefaults(defineProps<Props>(), {
  maxRating: 5,
  size: 'medium',
  interactive: false,
  showValue: false,
  showMaxValue: true,
  precision: 'half',
})

// Emits
const emit = defineEmits<{
  'update:rating': [value: number]
  hover: [value: number]
}>()

// State
const hoveredRating = ref<number | null>(null)
const componentId = ref(Math.random().toString(36).substring(7))

// Computed
const starColors = computed(() => REVIEWS_CONFIG.stars.colors)

const filledStars = computed(() => {
  const currentRating = hoveredRating.value ?? props.rating
  return Math.floor(currentRating)
})

const halfStar = computed(() => {
  const currentRating = hoveredRating.value ?? props.rating
  const decimal = currentRating - Math.floor(currentRating)

  if (props.precision === 'half' && decimal >= 0.25 && decimal < 0.75) {
    return Math.floor(currentRating) + 1
  }

  return null
})

// Methods
const getStarFill = (starNumber: number): string => {
  const currentRating = hoveredRating.value ?? props.rating

  if (starNumber <= filledStars.value) {
    return starColors.value.filled
  }

  if (starNumber === halfStar.value) {
    return `url(#half-${componentId.value}-${starNumber})`
  }

  return starColors.value.empty
}

const formatValue = (value: number): string => {
  return props.precision === 'full' ? value.toFixed(0) : value.toFixed(1)
}

const handleStarClick = (star: number) => {
  if (!props.interactive) return
  emit('update:rating', star)
}

const handleStarHover = (star: number) => {
  if (!props.interactive) return
  hoveredRating.value = star
  emit('hover', star)
}

const handleStarLeave = () => {
  if (!props.interactive) return
  hoveredRating.value = null
}
</script>

<style scoped>
.rating-stars {
  display: flex;
  align-items: center;
  gap: v-bind('REVIEWS_CONFIG.stars.gap');
}

.rating-stars__star {
  display: inline-flex;
  color: v-bind('starColors.empty');
  transition: color v-bind('REVIEWS_CONFIG.animations.starsHover');
  cursor: default;
}

.rating-stars__star--interactive {
  cursor: pointer;
}

.rating-stars__star--interactive:hover {
  transform: scale(1.1);
}

.rating-stars__star--filled {
  color: v-bind('starColors.filled');
}

.rating-stars__icon {
  width: 100%;
  height: 100%;
}

.rating-stars__value {
  margin-left: 0.5rem;
  font-weight: 500;
  color: v-bind('REVIEWS_CONFIG.colors.text.primary');
  font-size: 0.9em;
}

/* Tamaños */
.rating-stars--small {
  .rating-stars__star {
    width: v-bind('REVIEWS_CONFIG.stars.size.small');
    height: v-bind('REVIEWS_CONFIG.stars.size.small');
  }
}

.rating-stars--medium {
  .rating-stars__star {
    width: v-bind('REVIEWS_CONFIG.stars.size.medium');
    height: v-bind('REVIEWS_CONFIG.stars.size.medium');
  }
}

.rating-stars--large {
  .rating-stars__star {
    width: v-bind('REVIEWS_CONFIG.stars.size.large');
    height: v-bind('REVIEWS_CONFIG.stars.size.large');
  }
}

.rating-stars--xlarge {
  .rating-stars__star {
    width: v-bind('REVIEWS_CONFIG.stars.size.xlarge');
    height: v-bind('REVIEWS_CONFIG.stars.size.xlarge');
  }
}
</style>
