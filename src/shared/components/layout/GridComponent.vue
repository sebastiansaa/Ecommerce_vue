<template>
  <div class="grid-component">
    <slot />
  </div>
</template>

<style scoped>
.grid-component {
  display: grid;
  grid-template-columns: 1fr;
}
@media (min-width: 768px) {
  .grid-component {
    grid-template-columns: 4fr 1fr;
  }
}
</style>
