<template>
  <div class="summary-desktop">
    <!-- Imagen, nombre, precio, cantidad -->
    <img :src="product.images[0]" alt="Imagen producto" class="summary-img" />
    <div class="summary-info">
      <h2>{{ product.title }}</h2>
      <p>{{ changeCurrency(product.price) }}</p>
      <p>Cantidad: 1</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductInterface } from '@/domain/products/products/interface/ProductsInterface'
import { changeCurrency } from '@/shared/helpers'
defineProps<{ product: ProductInterface }>()
</script>

<style scoped>
.summary-desktop {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.summary-img {
  width: 120px;
  height: 120px;
  object-fit: contain;
  border-radius: 12px;
  background: #fafafa;
}
.summary-info {
  flex: 1;
}
</style>
