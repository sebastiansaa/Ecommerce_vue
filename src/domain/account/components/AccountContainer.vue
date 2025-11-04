<template>
  <div class="account-container">
    <aside class="account-sidebar">
      <slot name="menu" />
    </aside>
    <main class="account-content">
      <slot name="content" />
    </main>
  </div>
</template>

<script setup lang="ts">
// no necesita logica, ya que es el contenedor del layout
</script>

<style scoped>
.account-container {
  display: flex;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 70vh;
}
.account-sidebar {
  flex: 0 0 240px;
  min-width: 180px;
  max-width: 280px;
}
.account-content {
  flex: 1 1 0%;
  min-width: 0;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  padding: 2rem 1.5rem;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
@media (max-width: 1024px) {
  .account-container {
    gap: 1rem;
  }
  .account-sidebar {
    flex-basis: 140px;
    min-width: 100px;
    max-width: 180px;
  }
  .account-content {
    padding: 1.2rem 0.5rem;
  }
}
@media (max-width: 700px) {
  .account-container {
    display: block;
    max-width: 100vw;
    margin: 0;
  }
  .account-sidebar {
    display: none;
  }
  .account-content {
    border-radius: 0;
    box-shadow: none;
    padding: 0.5rem 0.2rem;
  }
}
</style>
