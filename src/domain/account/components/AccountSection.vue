<template>
  <AccountContainer>
    <template #menu>
      <MenuContainer v-if="!isMobile" v-model="section" />
    </template>
    <template #content>
      <ProfileContainer v-if="section === 'profile'" />
      <OrdersView v-else-if="section === 'orders'" />
      <WishListView v-else-if="section === 'wishlist'" />
      <SecurityContainer v-else-if="section === 'security'" />
    </template>
  </AccountContainer>
  <MenuMobile v-if="isMobile" v-model="section" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useBreakpoints } from '@/shared/composables'
import AccountContainer from './AccountContainer.vue'
import ProfileContainer from './profile/ProfileContainer.vue'
import OrdersView from '@/domain/order/views/OrdersView.vue'
import WishListView from '@/domain/products/WishList/views/WishListView.vue'
import MenuContainer from './menu/MenuContainer.vue'
import MenuMobile from './menu/MenuMobile.vue'
import SecurityContainer from './security/SecurityContainer.vue'

const section = ref('profile')
const { isMobile } = useBreakpoints()
</script>

<style scoped>
/* No se necesitan estilos, el layout lo maneja AccountContainer */
</style>
