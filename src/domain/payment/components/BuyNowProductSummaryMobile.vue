<template>
  <div class="summary-mobile">
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
.summary-mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.summary-img {
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 10px;
  background: #fafafa;
}
.summary-info {
  text-align: center;
}
</style>
