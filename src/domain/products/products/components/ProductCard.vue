<template>
  <div class="product-card" @click="handleClick">
    <img
      :src="product.images[0]"
      alt="Imagen del producto"
      class="product-image"
      :style="imageStyle"
      @error="handleImageError"
    />
    <h3>{{ truncatedTitle }}</h3>
    <p>
      <strong>{{ product.price }} USD</strong>
    </p>
  </div>
</template>

<script setup lang="ts">
import type { ProductInterface } from '@/domain/products/products/interface/ProductsInterface'
import { defineProps, defineEmits, computed } from 'vue'
import { handleImageError } from '@/domain/products/products/helpers'
import { PRODUCTS_CONFIG } from '@/domain/products/config/products.config'

const props = defineProps<{ product: ProductInterface }>()
const emit = defineEmits(['select'])

const truncatedTitle = computed(() => {
  return props.product.title.length > PRODUCTS_CONFIG.card.maxTitleLength
    ? props.product.title.substring(0, PRODUCTS_CONFIG.card.maxTitleLength) + '...'
    : props.product.title
})

const imageStyle = computed(() => ({
  aspectRatio: PRODUCTS_CONFIG.card.imageAspectRatio,
}))

function handleClick() {
  emit('select', props.product)
}
</script>

<style scoped>
.product-card {
  background: #fff;
  border-radius: v-bind('PRODUCTS_CONFIG.styles.borderRadius.card');
  box-shadow: v-bind('PRODUCTS_CONFIG.styles.shadows.card');
  padding: v-bind('PRODUCTS_CONFIG.styles.spacing.padding.medium');
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  transition: box-shadow v-bind('PRODUCTS_CONFIG.styles.transitions.normal')
    v-bind('PRODUCTS_CONFIG.styles.transitions.easing');
}

.product-card:hover {
  box-shadow: v-bind('PRODUCTS_CONFIG.styles.shadows.cardHover');
}

.product-card h3 {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
  text-align: center;
  transition: color v-bind('PRODUCTS_CONFIG.styles.transitions.normal')
    v-bind('PRODUCTS_CONFIG.styles.transitions.easing');
}

.product-card:hover h3 {
  color: #007bff;
}

.product-image {
  width: 100%;
  max-width: clamp(180px, 80%, 300px);
  aspect-ratio: 1 / 1;
  border-radius: v-bind('PRODUCTS_CONFIG.styles.borderRadius.image');
  margin-bottom: v-bind('PRODUCTS_CONFIG.styles.spacing.gap.medium');
  transition: transform v-bind('PRODUCTS_CONFIG.styles.transitions.normal')
    v-bind('PRODUCTS_CONFIG.styles.transitions.easing');
}

.product-card:hover .product-image {
  transform: translateY(-8px);
}

/* Solo aplicar hover en dispositivos con mouse */
@media (hover: none) {
  .product-card:hover {
    box-shadow: v-bind('PRODUCTS_CONFIG.styles.shadows.card');
  }

  .product-card:hover .product-image {
    transform: translateY(0);
  }

  .product-card:hover h3 {
    color: inherit;
  }
}
</style>
