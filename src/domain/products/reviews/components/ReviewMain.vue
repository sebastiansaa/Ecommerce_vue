<template>
  <ReviewMainDesktop v-if="!isMobile" :product-id="productId" />
  <ReviewMainMobile v-else :product-id="productId" />
</template>

<script setup lang="ts">
import { useBreakpoints } from '@/shared/composables'
import ReviewMainDesktop from './ReviewMainDesktop.vue'
import ReviewMainMobile from './ReviewMainMobile.vue'

interface Props {
  productId: string
}

defineProps<Props>()

const { isMobile } = useBreakpoints()
</script>
