<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavComponent from './shared/components/navigation/NavComponent.vue'
import Footer from './shared/components/layout/Footer.vue'
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
  <Footer />
</template>

<style>
body {
  background: #ece9e2;
  margin: 0;
  padding: 0;
}
#app-content {
  background: transparent;
  padding-top: 0;
}
main {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
