<template>
  <div class="wishlist-item">
    <img :src="item.product.images[0]" alt="Imagen del producto" class="wishlist-img" />
    <div class="wishlist-info">
      <h2 class="wishlist-product-title">{{ item.product.title }}</h2>
      <p class="wishlist-product-price">${{ item.product.price.toFixed(2) }}</p>
      <button class="wishlist-remove" @click="$emit('remove')">Quitar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WishListItem } from '../interface/WishListItem'

defineProps<{ item: WishListItem }>()
</script>

<style scoped>
.wishlist-item {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  padding: 1rem;
  gap: 1rem;
}

.wishlist-img {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 0.5rem;
  border: 1.5px solid #e0e0e0;
}

.wishlist-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.wishlist-product-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.wishlist-product-price {
  color: #667eea;
  font-weight: 500;
  margin: 0;
}

.wishlist-remove {
  background: none;
  border: none;
  color: #e53e3e;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.95rem;
  transition: color 0.2s;
}
.wishlist-remove:hover {
  color: #764ba2;
}
</style>
