<template>
  <div class="product-description">
    <ProductDescriptionDesktop v-if="isDesktop" :product="product" />
    <ProductDescriptionMobile v-else :product="product" />
  </div>
</template>

<script setup lang="ts">
import { ProductDescriptionDesktop, ProductDescriptionMobile } from './index'
import { useBreakpoints } from '@/shared/composables'
import type { ProductInterface } from '@/domain/products/products/interface/ProductsInterface'

const props = defineProps<{ product: ProductInterface }>()

const { isDesktop } = useBreakpoints()
</script>

<style scoped>
.product-description {
  width: 100%;
}
</style>
