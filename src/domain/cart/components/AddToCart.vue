<template>
  <div class="add-to-cart">
    <button class="add-to-cart__button" @click="onAddToCart">Agregar al carrito</button>
  </div>
</template>

<script setup lang="ts">
import type { ProductInterface } from '@/domain/products/products/interface/ProductsInterface'

defineProps<{ product: ProductInterface }>()

function onAddToCart() {
  // Aquí irá la lógica para agregar al carrito
  alert('Producto agregado al carrito (demo)')
}
</script>

<style scoped>
.add-to-cart {
  width: 100%;
  display: flex;
  justify-content: center;
}

.add-to-cart__button {
  background: #10b981;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;
  box-sizing: border-box;
}

@media (max-width: 600px) {
  .add-to-cart__button {
    width: 100%;
    min-width: 0;
    max-width: none;
  }
}
.add-to-cart__button:hover {
  background: #059669;
}
</style>
