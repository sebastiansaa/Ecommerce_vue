<template>
  <div>
    <NavMobile v-if="isMobile" />
    <NavDesktop v-else />
    <div class="nav-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import NavDesktop from './desktop/NavDesktop.vue'
import NavMobile from './movil/NavMobile.vue'
import { useBreakpoints } from '@/shared/composables/useBreakpoints'

const { isMobile } = useBreakpoints()
</script>

<style scoped>
.nav-content {
  padding-top: 56px;
}
@media (min-width: 768px) {
  .nav-content {
    padding-top: 120px;
  }
}
</style>
