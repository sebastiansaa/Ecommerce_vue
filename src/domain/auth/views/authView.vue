<template>
  <div class="auth-view-wrapper">
    <AuthContainer />
  </div>
</template>

<script setup lang="ts">
import AuthContainer from '../components/AuthContainer.vue'
</script>

<style scoped>
.auth-view-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
}
</style>
