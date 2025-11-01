<template>
  <div class="account-view">
    <AccountProfileForm />
  </div>
</template>

<script setup lang="ts">
import AccountProfileForm from '../components/AccountProfileForm.vue'
</script>

<style scoped>
.account-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  padding: 2rem 0;
}
</style>
