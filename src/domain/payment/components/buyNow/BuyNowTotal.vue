<template>
  <div class="buy-now-total">
    <div class="row">
      <span>Subtotal:</span>
      <span>{{ changeCurrency(product.price) }}</span>
    </div>
    <div class="row">
      <span>Envío:</span>
      <span>$0.00</span>
    </div>
    <div class="row total">
      <span>Total:</span>
      <span>{{ changeCurrency(product.price) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductInterface } from '@/domain/products/products/interface/ProductsInterface'
import { changeCurrency } from '@/shared/helpers/changeCurrency'
const props = defineProps<{ product: ProductInterface; form?: any }>()
</script>

<style scoped>
.buy-now-total {
  background: #fafafa;
  border-radius: 10px;
  padding: 1rem 1.5rem;
  font-size: 1.1rem;
}
.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.total {
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
