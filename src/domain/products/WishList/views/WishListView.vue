<template>
  <section class="wishlist-view">
    <div class="wishlist-container">
      <h1 class="wishlist-title">Lista de deseos</h1>
      <div v-if="items.length === 0" class="wishlist-empty">
        <WishListEmpty />
      </div>
      <div v-else :class="['wishlist-list', isMobile ? 'mobile' : 'desktop']">
        <WishListItem
          v-for="item in items"
          :key="item.id"
          :item="item"
          @remove="removeFromWishList(item.product.id)"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useWishList } from '../composable/useWishList'
import WishListItem from '../components/WishListItem.vue'
import WishListEmpty from '../components/WishListEmpty.vue'

const { items, removeFromWishList, isMobile } = useWishList()
</script>

<style scoped>
.wishlist-view {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 3rem 0;
  box-sizing: border-box;
}

.wishlist-container {
  background: #fff;
  padding: 2rem 1.5rem;
  border-radius: 1.25rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
}

.wishlist-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
}

.wishlist-empty {
  text-align: center;
  color: #666;
  font-size: 1.1rem;
  margin-top: 2rem;
}

.wishlist-list.desktop {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.wishlist-list.mobile {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
