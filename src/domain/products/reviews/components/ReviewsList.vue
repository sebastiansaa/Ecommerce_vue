<template>
  <ReviewsListDesktop
    v-if="!isMobile"
    :reviews="reviews"
    :total-reviews="totalReviews"
    :is-loading="isLoading"
    :on-load-more="handleLoadMore"
  />
  <ReviewsListMobile
    v-else
    :reviews="reviews"
    :total-reviews="totalReviews"
    :is-loading="isLoading"
    :on-load-more="handleLoadMore"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useBreakpoints } from '@/shared/composables'
import { getMockReviews } from '../services/mockReviews'
import ReviewsListDesktop from './ReviewsListDesktop.vue'
import ReviewsListMobile from './ReviewsListMobile.vue'

interface Props {
  productId: number
}

defineProps<Props>()

// Composables
const { isMobile } = useBreakpoints()

// State - usando mock data
const currentPage = ref(1)
const isLoading = ref(false)

// Mock data inicial
const initialData = getMockReviews(1, 6) // Cargar 6 reviews iniciales
const reviews = ref(initialData.reviews)
const totalReviews = ref(initialData.total)

// Función para cargar más reviews
const handleLoadMore = async () => {
  if (isLoading.value) return

  isLoading.value = true

  // Simular delay de API
  await new Promise((resolve) => setTimeout(resolve, 500))

  currentPage.value++
  const newData = getMockReviews(currentPage.value, 3) // Cargar 3 más

  reviews.value.push(...newData.reviews)
  isLoading.value = false
}
</script>
