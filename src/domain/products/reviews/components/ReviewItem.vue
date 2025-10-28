<template>
  <ReviewItemDesktop v-if="!isMobile" :review="review" :compact="compact" />
  <ReviewItemMobile v-else :review="review" :compact="compact" />
</template>

<script setup lang="ts">
import { useBreakpoints } from '@/shared/composables'
import ReviewItemDesktop from './ReviewItemDesktop.vue'
import ReviewItemMobile from './ReviewItemMobile.vue'
import type { Review } from '../interface'

interface Props {
  review: Review
  compact?: boolean
}

withDefaults(defineProps<Props>(), {
  compact: false,
})

const { isMobile } = useBreakpoints()
</script>
