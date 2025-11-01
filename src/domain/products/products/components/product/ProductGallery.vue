<template>
  <div class="product-gallery">
    <ProductGalleryDesktop v-if="isDesktop" :images="images" :product="product" />
    <ProductGalleryMobile v-else :images="images" :description="description" :product="product" />
  </div>
</template>

<script setup lang="ts">
import ProductGalleryDesktop from './ProductGalleryDesktop.vue'
import ProductGalleryMobile from './ProductGalleryMobile.vue'
import { useBreakpoints } from '@/shared/composables'
import type { ProductInterface } from '../../interface'

const props = defineProps<{ images: string[]; description?: string; product?: ProductInterface }>()

const { isDesktop } = useBreakpoints()
</script>

<style scoped>
.product-gallery {
  width: 100%;
}
</style>
