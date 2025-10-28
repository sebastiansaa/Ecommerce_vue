<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavComponent from './shared/components/navigation/NavComponent.vue'
</script>

<template>
  <header>
    <NavComponent />
  </header>
  <div id="app-content">
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style>
body {
  background: #ece9e2;
  margin: 0;
  padding: 0;
}
#app-content {
  background: transparent;
  min-height: 100vh;
  padding-top: 0;
}
</style>
