<template>
  <div class="user-profile-card">
    <UserProfileCardDesktop v-if="isDesktop" :user="user" />
    <UserProfileCardMobile v-else :user="user" />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/domain/auth/store/useAuthStore'
import { useBreakpoints } from '@/shared/composables'
import UserProfileCardDesktop from './UserProfileCardDesktop.vue'
import UserProfileCardMobile from './UserProfileCardMobile.vue'

const authStore = useAuthStore()
const user = authStore.user

const { isDesktop } = useBreakpoints()
</script>

<style scoped>
.user-profile-card {
  width: 100%;
}
</style>
