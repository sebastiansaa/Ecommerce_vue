<template>
  <component
    :is="isMobile ? 'BuyNowProductSummaryMobile' : 'BuyNowProductSummaryDesktop'"
    :product="product"
  />
</template>

<script setup lang="ts">
import BuyNowProductSummaryDesktop from './BuyNowProductSummaryDesktop.vue'
import BuyNowProductSummaryMobile from './BuyNowProductSummaryMobile.vue'
import { useBreakpoints } from '@/shared/composables/useBreakpoints'
import type { ProductInterface } from '@/domain/products/products/interface/ProductsInterface'

defineProps<{ product: ProductInterface }>()
const { isMobile } = useBreakpoints()
</script>
