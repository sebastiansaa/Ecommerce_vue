<template>
  <div class="product-gallery-mobile">
    <div v-if="images && images.length" class="gallery-main">
      <img :src="images[selected]" alt="Imagen principal" class="main-image" />
    </div>
    <div v-if="images && images.length > 1" class="gallery-thumbnails">
      <img
        v-for="(img, idx) in images"
        :key="idx"
        :src="img"
        alt="Miniatura"
        class="thumbnail"
        :class="{ active: idx === selected }"
        @click="selected = idx"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PRODUCTS_CONFIG } from '@/domain/products/config/products.config'

const props = defineProps<{ images: string[]; description?: string }>()
const selected = ref(0)
</script>

<style scoped>
.product-gallery-mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.gallery-main {
  margin-bottom: v-bind('PRODUCTS_CONFIG.styles.spacing.gap.medium');
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
}
.main-image {
  width: 100%;
  max-width: 400px;
  object-fit: contain;
  border-radius: v-bind('PRODUCTS_CONFIG.styles.borderRadius.image');
  display: block;
}
.gallery-thumbnails {
  display: flex;
  flex-direction: row;
  gap: v-bind('PRODUCTS_CONFIG.styles.spacing.gap.small');
  overflow-x: auto;
  width: 100%;
  min-width: 0;
  justify-content: flex-start;
  margin-bottom: v-bind('PRODUCTS_CONFIG.styles.spacing.gap.medium');
}
.thumbnail {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: v-bind('PRODUCTS_CONFIG.styles.borderRadius.thumbnail');
  cursor: pointer;
  opacity: 0.7;
  border: 2px solid transparent;
  transition:
    border v-bind('PRODUCTS_CONFIG.styles.transitions.fast')
      v-bind('PRODUCTS_CONFIG.styles.transitions.easing'),
    opacity v-bind('PRODUCTS_CONFIG.styles.transitions.fast')
      v-bind('PRODUCTS_CONFIG.styles.transitions.easing');
}
.thumbnail.active {
  border: 2px solid #007bff;
  opacity: 1;
}
@media (max-width: 767px) {
  .main-image {
    max-width: 320px;
    width: 100%;
    margin: 0 auto;
  }
}
</style>
