<template>
  <div class="user-profile-view">
    <UserProfileCard />
    <UserProfileForm />
  </div>
</template>

<script setup lang="ts">
import UserProfileCard from '../components/UserProfileCard.vue'
import UserProfileForm from '../components/UserProfileForm.vue'
</script>

<style scoped>
.user-profile-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  padding: 2rem 0;
}
</style>
