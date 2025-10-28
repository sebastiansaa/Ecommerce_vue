<template>
  <div class="product-related">
    <ProductRelatedDesktop v-if="isTabletLandscapeOrDesktop" :product="product" />
    <ProductRelatedMobile v-else :product="product" />
  </div>
</template>

<script setup lang="ts">
import ProductRelatedDesktop from './ProductRelatedDesktop.vue'
import ProductRelatedMobile from './ProductRelatedMobile.vue'
import { useBreakpoints } from '@/shared/composables'
import type { ProductInterface } from '../../interface/ProductsInterface'

interface Props {
  product: ProductInterface
}

const props = defineProps<Props>()

const { isTabletLandscapeOrDesktop } = useBreakpoints()
</script>

<style scoped>
.product-related {
  width: 100%;
}
</style>
