<template>
  <div class="wishlist-item clickable" @click="goToProductDetail">
    <img :src="item.product.images[0]" alt="Imagen del producto" class="wishlist-img" />
    <div class="wishlist-info">
      <h2 class="wishlist-product-title">{{ item.product.title }}</h2>
      <p class="wishlist-product-price">${{ item.product.price.toFixed(2) }}</p>
      <button class="wishlist-remove" @click.stop="$emit('remove')">Quitar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WishListItem } from '../interface/WishListItem'
import { useProductNavigation } from '@/shared/composables/useProductNavigation'
import { adaptProductId } from '@/domain/products/products/helpers/adaptProduct'
import { computed } from 'vue'

const props = defineProps<{ item: WishListItem }>()
const { navigateToProduct } = useProductNavigation()

function getSafeProduct(product: any) {
  // Adaptar y completar con valores por defecto si faltan campos
  const adapted = adaptProductId(product)
  return {
    id: adapted.id,
    title: adapted.title || '',
    slug: adapted.slug || adapted.title?.toLowerCase().replace(/\s+/g, '-') || 'producto',
    price: adapted.price || 0,
    description: adapted.description || '',
    category: adapted.category || { id: '', slug: '', name: '' },
    images: adapted.images || [],
    createdAt: adapted.createdAt || '',
    updatedAt: adapted.updatedAt || '',
  }
}

function goToProductDetail() {
  const product = getSafeProduct(props.item.product)
  navigateToProduct(product)
}
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
  cursor: pointer;
}

.wishlist-item.clickable:hover {
  background: #f3f4f6;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
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
