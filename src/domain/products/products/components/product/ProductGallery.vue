<template>
  <div class="product-gallery">
    <ProductGalleryDesktop v-if="isDesktop" :images="images" />
    <ProductGalleryMobile v-else :images="images" :description="description" />
  </div>
</template>

<script setup lang="ts">
import ProductGalleryDesktop from './ProductGalleryDesktop.vue'
import ProductGalleryMobile from './ProductGalleryMobile.vue'
import { useBreakpoints } from '@/shared/composables'

const props = defineProps<{ images: string[]; description?: string }>()

const { isDesktop } = useBreakpoints()
</script>

<style scoped>
.product-gallery {
  width: 100%;
}
</style>
