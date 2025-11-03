<template>
  <div class="account-profile-card">
    <AccountProfileCardDesktop v-if="isDesktop" :user="user" />
    <AccountProfileCardMobile v-else :user="user" />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/domain/auth/store/useAuthStore'
import { useBreakpoints } from '@/shared/composables'
import AccountProfileCardDesktop from './AccountProfileCardDesktop.vue'
import AccountProfileCardMobile from './AccountProfileCardMobile.vue'

const authStore = useAuthStore()
const user = authStore.user

const { isDesktop } = useBreakpoints()
</script>

<style scoped>
.account-profile-card {
  width: 100%;
}
</style>
