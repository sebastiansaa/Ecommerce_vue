<template>
  <div class="account-profile-card">
    <!-- Si está en modo edición, muestra el formulario -->
    <AccountProfileForm v-if="accountEdit.isEditing" @back="accountEdit.stopEditing()" />
    <!-- Si no, muestra la vista normal y el botón Modificar -->
    <div v-else>
      <AccountProfileCardDesktop v-if="isDesktop" :user="user" />
      <AccountProfileCardMobile v-else :user="user" />
      <BaseAccountButton @click="accountEdit.startEditing('profile')">Modificar</BaseAccountButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/domain/auth/store/useAuthStore'
import { useBreakpoints } from '@/shared/composables'
import { AccountProfileCardDesktop, AccountProfileCardMobile, AccountProfileForm } from './index'
import { useAccountEditStore } from '@/domain/account/store/useAccountEditStore'
import { BaseAccountButton } from '@/shared/components/ui/actions/buttons'

const authStore = useAuthStore()
const user = authStore.user

const accountEdit = useAccountEditStore()
const { isDesktop } = useBreakpoints()
</script>

<style scoped>
.account-profile-card {
  width: 100%;
}
</style>
