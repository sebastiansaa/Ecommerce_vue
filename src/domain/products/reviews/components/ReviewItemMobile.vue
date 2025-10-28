<template>
  <article class="review-item-mobile">
    <!-- Header compacto -->
    <header class="review-item-mobile__header">
      <!-- Avatar pequeño -->
      <div class="review-item-mobile__avatar">
        <img
          v-if="review.avatar && !showAvatarFallback"
          :src="review.avatar"
          :alt="`Avatar de ${review.userName}`"
          class="review-item-mobile__avatar-image"
          @error="handleAvatarError"
        />
        <div
          v-else
          class="review-item-mobile__avatar-fallback"
          :style="{ backgroundColor: avatarColor }"
        >
          {{ userInitials }}
        </div>
      </div>

      <!-- Info usuario y rating juntos -->
      <div class="review-item-mobile__user-section">
        <div class="review-item-mobile__user-info">
          <h4 class="review-item-mobile__user-name">{{ review.userName }}</h4>
          <time class="review-item-mobile__date" :datetime="review.date">
            {{ formattedDate }}
          </time>
        </div>
        <div class="review-item-mobile__rating">
          <RatingStars :rating="review.rating" :max-rating="5" :show-value="false" />
        </div>
      </div>
    </header>

    <!-- Comentario -->
    <div class="review-item-mobile__content">
      <p class="review-item-mobile__comment">
        <span v-if="!isExpanded && shouldTruncate">
          {{ truncatedComment }}
          <button @click="toggleExpanded" class="review-item-mobile__expand-button">Ver más</button>
        </span>
        <span v-else>
          {{ review.comment }}
          <button
            v-if="shouldTruncate && isExpanded"
            @click="toggleExpanded"
            class="review-item-mobile__expand-button"
          >
            Ver menos
          </button>
        </span>
      </p>
    </div>

    <!-- Footer compacto -->
    <footer class="review-item-mobile__footer">
      <button
        class="review-item-mobile__helpful-button"
        @click="toggleHelpful"
        :class="{ 'review-item-mobile__helpful-button--active': isHelpful }"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" class="review-item-mobile__helpful-icon">
          <path
            d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
          />
        </svg>
        <span class="review-item-mobile__helpful-text">
          {{ helpfulCount > 0 ? helpfulCount : 'Útil' }}
        </span>
      </button>
    </footer>
  </article>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RatingStars } from '@/shared/components/ui/feedback'
import { REVIEWS_CONFIG } from '../../config/reviews.config'
import type { Review } from '../interface'

interface Props {
  review: Review
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  compact: true,
})

// State
const isExpanded = ref(false)
const isHelpful = ref(false)
const helpfulCount = ref(Math.floor(Math.random() * 10)) // Mock data
const showAvatarFallback = ref(!props.review.avatar)

// Computed
const userInitials = computed(() => {
  return props.review.userName
    .split(' ')
    .map((name) => name.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
})

const avatarColor = computed(() => {
  const colors = REVIEWS_CONFIG.reviewItem.avatar.fallbackColors
  const index = props.review.userName.length % colors.length
  return colors[index]
})

const formattedDate = computed(() => {
  const reviewDate = new Date(props.review.date)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - reviewDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return '1d'
  if (diffDays < 7) return `${diffDays}d`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}sem`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}m`
  return `${Math.floor(diffDays / 365)}a`
})

const shouldTruncate = computed(() => {
  return props.review.comment.length > 120 // Más corto en mobile
})

const truncatedComment = computed(() => {
  return props.review.comment.slice(0, 120) + '...'
})

// Methods
const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}

const toggleHelpful = () => {
  isHelpful.value = !isHelpful.value
  helpfulCount.value += isHelpful.value ? 1 : -1
}

const handleAvatarError = () => {
  showAvatarFallback.value = true
}
</script>

<style scoped>
.review-item-mobile {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.75rem;
  background-color: v-bind('REVIEWS_CONFIG.colors.background.card');
  border-radius: 0.5rem;
  border: 1px solid v-bind('REVIEWS_CONFIG.colors.border.light');
}

.review-item-mobile__header {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.review-item-mobile__avatar {
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
}

.review-item-mobile__avatar-image,
.review-item-mobile__avatar-fallback {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.review-item-mobile__avatar-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
}

.review-item-mobile__user-section {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.review-item-mobile__user-info {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.review-item-mobile__user-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: v-bind('REVIEWS_CONFIG.colors.text.primary');
  margin: 0;
  line-height: 1.2;
}

.review-item-mobile__date {
  font-size: 0.75rem;
  color: v-bind('REVIEWS_CONFIG.colors.text.secondary');
}

.review-item-mobile__rating {
  flex-shrink: 0;
}

.review-item-mobile__content {
  margin-left: 2.75rem; /* Alinear con el texto del usuario */
}

.review-item-mobile__comment {
  font-size: 0.875rem;
  line-height: 1.5;
  color: v-bind('REVIEWS_CONFIG.colors.text.primary');
  margin: 0;
}

.review-item-mobile__expand-button {
  background: none;
  border: none;
  color: #3b82f6;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  margin-left: 0.25rem;
  padding: 0;
}

.review-item-mobile__expand-button:hover {
  text-decoration: underline;
}

.review-item-mobile__footer {
  display: flex;
  justify-content: flex-end;
  margin-left: 2.75rem;
}

.review-item-mobile__helpful-button {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: 1px solid v-bind('REVIEWS_CONFIG.colors.border.light');
  border-radius: 1rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  color: v-bind('REVIEWS_CONFIG.colors.text.secondary');
  cursor: pointer;
  transition: all 0.2s ease;
}

.review-item-mobile__helpful-button:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}

.review-item-mobile__helpful-button--active {
  border-color: #3b82f6;
  background-color: #eff6ff;
  color: #3b82f6;
}

.review-item-mobile__helpful-icon {
  width: 0.875rem;
  height: 0.875rem;
}

.review-item-mobile__helpful-text {
  font-weight: 500;
}
</style>
