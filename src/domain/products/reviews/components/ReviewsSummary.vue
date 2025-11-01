<template>
  <ReviewsSummaryDesktop
    v-if="!isMobile"
    :average-rating="averageRating"
    :total-reviews="totalReviews"
    :ratings-distribution="ratingsDistribution"
  />
  <ReviewsSummaryMobile
    v-else
    :average-rating="averageRating"
    :total-reviews="totalReviews"
    :ratings-distribution="ratingsDistribution"
  />
</template>

<script setup lang="ts">
import { useBreakpoints } from '@/shared/composables'
import { mockReviewSummary } from '../services/mockReviews'
import ReviewsSummaryDesktop from './ReviewsSummaryDesktop.vue'
import ReviewsSummaryMobile from './ReviewsSummaryMobile.vue'

interface Props {
  productId: string
}

defineProps<Props>()

const { isMobile } = useBreakpoints()

// Data del mock - En una app real vendría de un composable useReviews
const { averageRating, totalReviews, ratingsDistribution } = mockReviewSummary
</script>
