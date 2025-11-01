<template>
  <div class="order-detail">
    <UserOrderDetailDesktop
      v-if="isDesktop"
      :order="order"
      :is-loading="isLoading"
      :error="error"
    />
    <UserOrderDetailMobile v-else :order="order" :is-loading="isLoading" :error="error" />
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { getOrderDetail } from '@/domain/user/services/orderService'
import { useRoute } from 'vue-router'
import { useBreakpoints } from '@/shared/composables'
import UserOrderDetailDesktop from './UserOrderDetailDesktop.vue'
import UserOrderDetailMobile from './UserOrderDetailMobile.vue'

const route = useRoute()
const orderId = route.params.id as string

const { isDesktop } = useBreakpoints()

const { data, isLoading, error } = useQuery({
  queryKey: ['order', orderId],
  queryFn: () => getOrderDetail(orderId),
  enabled: !!orderId,
})

const order = data?.value
</script>

<style scoped>
.order-detail {
  width: 100%;
}
</style>
