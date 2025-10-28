<template>
  <article class="review-item-desktop">
    <header class="review-item-desktop__header">
      <!-- Avatar más grande -->
      <div class="review-item-desktop__avatar">
        <img
          v-if="review.avatar && !showAvatarFallback"
          :src="review.avatar"
          :alt="`Avatar de ${review.userName}`"
          class="review-item-desktop__avatar-image"
          @error="handleAvatarError"
        />
        <div
          v-else
          class="review-item-desktop__avatar-fallback"
          :style="{ backgroundColor: avatarColor }"
        >
          {{ userInitials }}
        </div>
      </div>

      <!-- Info usuario más detallada -->
      <div class="review-item-desktop__user-section">
        <div class="review-item-desktop__user-info">
          <h4 class="review-item-desktop__user-name">{{ review.userName }}</h4>
          <time class="review-item-desktop__date" :datetime="review.date">
            {{ formattedDate }}
          </time>
        </div>

        <!-- Rating con más espacio -->
        <div class="review-item-desktop__rating">
          <RatingStars :rating="review.rating" :max-rating="5" size="small" :show-value="true" />
        </div>
      </div>

      <!-- Badges de verificación -->
      <div class="review-item-desktop__badges" v-if="review.isVerified">
        <span class="review-item-desktop__verified-badge">
          <svg viewBox="0 0 20 20" fill="currentColor" class="review-item-desktop__verified-icon">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          Compra verificada
        </span>
      </div>
    </header>

    <!-- Comentario con más contexto -->
    <div class="review-item-desktop__content">
      <p class="review-item-desktop__comment">
        <span v-if="!isExpanded && shouldTruncate">
          {{ truncatedComment }}
          <button @click="toggleExpanded" class="review-item-desktop__expand-button">
            Leer más
          </button>
        </span>
        <span v-else>
          {{ review.comment }}
          <button
            v-if="shouldTruncate && isExpanded"
            @click="toggleExpanded"
            class="review-item-desktop__expand-button"
          >
            Leer menos
          </button>
        </span>
      </p>
    </div>

    <!-- Footer con más opciones -->
    <footer class="review-item-desktop__footer">
      <div class="review-item-desktop__actions">
        <button
          class="review-item-desktop__helpful-button"
          @click="toggleHelpful"
          :class="{ 'review-item-desktop__helpful-button--active': isHelpful }"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" class="review-item-desktop__helpful-icon">
            <path
              d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
            />
          </svg>
          <span class="review-item-desktop__helpful-text"> Útil ({{ helpfulCount }}) </span>
        </button>

        <button class="review-item-desktop__share-button">
          <svg viewBox="0 0 20 20" fill="currentColor" class="review-item-desktop__share-icon">
            <path
              d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"
            />
          </svg>
          Compartir
        </button>

        <button class="review-item-desktop__report-button">
          <svg viewBox="0 0 20 20" fill="currentColor" class="review-item-desktop__report-icon">
            <path
              fill-rule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          Reportar
        </button>
      </div>

      <!-- Meta información adicional -->
      <div class="review-item-desktop__meta" v-if="helpfulCount > 0">
        <span class="review-item-desktop__meta-text">
          {{ helpfulCount }}
          {{ helpfulCount === 1 ? 'persona encuentra' : 'personas encuentran' }} esto útil
        </span>
      </div>
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
  compact: false,
})

// State
const isExpanded = ref(false)
const isHelpful = ref(false)
const helpfulCount = ref(Math.floor(Math.random() * 25))
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

  if (diffDays === 1) return 'Hace 1 día'
  if (diffDays < 7) return `Hace ${diffDays} días`
  if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`
  if (diffDays < 365) return `Hace ${Math.floor(diffDays / 30)} meses`
  return `Hace ${Math.floor(diffDays / 365)} años`
})

const shouldTruncate = computed(() => {
  return props.review.comment.length > 250 // Más largo en desktop
})

const truncatedComment = computed(() => {
  return props.review.comment.slice(0, 250) + '...'
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
.review-item-desktop {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.5rem;
  background-color: v-bind('REVIEWS_CONFIG.colors.background.card');
  border-radius: 0.75rem;
  border: 1px solid v-bind('REVIEWS_CONFIG.colors.border.light');
  transition: box-shadow 0.2s ease;
}

.review-item-desktop:hover {
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.review-item-desktop__header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.review-item-desktop__avatar {
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
}

.review-item-desktop__avatar-image,
.review-item-desktop__avatar-fallback {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.review-item-desktop__avatar-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
  color: white;
}

.review-item-desktop__user-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.review-item-desktop__user-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.review-item-desktop__user-name {
  font-size: 1rem;
  font-weight: 600;
  color: v-bind('REVIEWS_CONFIG.colors.text.primary');
  margin: 0;
  line-height: 1.2;
}

.review-item-desktop__date {
  font-size: 0.875rem;
  color: v-bind('REVIEWS_CONFIG.colors.text.secondary');
}

.review-item-desktop__badges {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.review-item-desktop__verified-badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background-color: #ecfdf5;
  color: #059669;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.review-item-desktop__verified-icon {
  width: 1rem;
  height: 1rem;
}

.review-item-desktop__content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-left: 4rem; /* Alinear con el contenido del usuario */
}

.review-item-desktop__comment {
  font-size: 1rem;
  line-height: 1.6;
  color: v-bind('REVIEWS_CONFIG.colors.text.primary');
  margin: 0;
}

.review-item-desktop__expand-button {
  background: none;
  border: none;
  color: #3b82f6;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-left: 0.5rem;
  padding: 0;
}

.review-item-desktop__expand-button:hover {
  text-decoration: underline;
}

.review-item-desktop__footer {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-left: 4rem;
}

.review-item-desktop__actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.review-item-desktop__helpful-button,
.review-item-desktop__share-button,
.review-item-desktop__report-button {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  background: none;
  border: 1px solid v-bind('REVIEWS_CONFIG.colors.border.light');
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: v-bind('REVIEWS_CONFIG.colors.text.secondary');
  cursor: pointer;
  transition: all 0.2s ease;
}

.review-item-desktop__helpful-button:hover,
.review-item-desktop__share-button:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}

.review-item-desktop__report-button:hover {
  border-color: #ef4444;
  color: #ef4444;
}

.review-item-desktop__helpful-button--active {
  border-color: #3b82f6;
  background-color: #eff6ff;
  color: #3b82f6;
}

.review-item-desktop__helpful-icon,
.review-item-desktop__share-icon,
.review-item-desktop__report-icon {
  width: 1rem;
  height: 1rem;
}

.review-item-desktop__helpful-text {
  font-weight: 500;
}

.review-item-desktop__meta {
  padding-top: 0.5rem;
  border-top: 1px solid v-bind('REVIEWS_CONFIG.colors.border.light');
}

.review-item-desktop__meta-text {
  font-size: 0.75rem;
  color: v-bind('REVIEWS_CONFIG.colors.text.muted');
  font-style: italic;
}
</style>
