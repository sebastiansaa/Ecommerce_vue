<template>
  <GridComponent class="product-grid">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      @select="navigateToProduct"
    />
  </GridComponent>
</template>

<script setup lang="ts">
import type { ProductInterface } from '@/domain/products/products/interface/ProductsInterface'
import GridComponent from '@/shared/components/layout/GridComponent.vue'
import ProductCard from './ProductCard.vue'
import { PRODUCTS_CONFIG } from '@/domain/products/config/products.config'
import { useProductNavigation } from '@/shared/composables'
import { defineProps } from 'vue'

const props = defineProps<{ products: ProductInterface[] }>()
const { navigateToProduct } = useProductNavigation()
</script>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  padding: v-bind('PRODUCTS_CONFIG.styles.spacing.padding.medium');
  width: 100%;
}

@media (max-width: 600px) {
  .product-grid {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 380px) {
  .product-grid {
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  }
}
</style>
