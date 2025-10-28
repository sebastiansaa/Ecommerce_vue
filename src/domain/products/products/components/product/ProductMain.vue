<template>
  <div class="product-main">
    <ProductMainDesktop v-if="isDesktop" :product="product" />
    <ProductMainMobile v-else :product="product" />
  </div>
</template>

<script setup lang="ts">
import ProductMainDesktop from './ProductMainDesktop.vue'
import ProductMainMobile from './ProductMainMobile.vue'
import { useBreakpoints } from '@/shared/composables'
import type { ProductInterface } from '../../interface'

const props = defineProps<{ product: ProductInterface }>()

const { isDesktop } = useBreakpoints()
</script>

<style scoped>
.product-main {
  width: 100%;
}
</style>
