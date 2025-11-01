<template>
  <div class="orders-list">
    <UserOrdersListDesktop
      v-if="isDesktop"
      :orders="orders"
      :is-loading="isLoading"
      :error="error"
    />
    <UserOrdersListMobile v-else :orders="orders" :is-loading="isLoading" :error="error" />
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { getUserOrders } from '@/domain/user/services/orderService'
import { useAuthStore } from '@/domain/auth/store/useAuthStore'
import { useBreakpoints } from '@/shared/composables'
import UserOrdersListDesktop from './UserOrdersListDesktop.vue'
import UserOrdersListMobile from './UserOrdersListMobile.vue'

const authStore = useAuthStore()
const userId = authStore.user?.id

const { isDesktop } = useBreakpoints()

const { data, isLoading, error } = useQuery({
  queryKey: ['orders', userId],
  queryFn: () => getUserOrders(userId!),
  enabled: !!userId,
})

const orders = data?.value || []
</script>

<style scoped>
.orders-list {
  width: 100%;
}
</style>
