<template>
  <div class="user-wishlist-view">
    <UserWishList />
  </div>
</template>

<script setup lang="ts">
import UserWishList from '../components/UserWishList.vue'
</script>

<style scoped>
.user-wishlist-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
}
</style>
