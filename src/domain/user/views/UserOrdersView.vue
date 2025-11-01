<template>
  <div class="user-orders-view">
    <UserOrdersList />
  </div>
</template>

<script setup lang="ts">
import UserOrdersList from '../components/UserOrdersList.vue'
</script>

<style scoped>
.user-orders-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
}
</style>
