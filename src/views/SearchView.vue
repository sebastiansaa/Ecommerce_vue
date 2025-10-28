<template>
  <div class="search-container">
    <h1>Buscar Productos</h1>
    <div class="search-content">
      <div class="search-box">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Busca productos, marcas, categorías..."
          class="search-input"
          @keyup.enter="performSearch"
        />
        <button @click="performSearch" class="search-button">🔍 Buscar</button>
      </div>
      <div v-if="searchQuery" class="search-results">
        <p>Funcionalidad de búsqueda en desarrollo...</p>
        <p>Término buscado: "{{ searchQuery }}"</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')

function performSearch() {
  console.log('Buscando:', searchQuery.value)
  // Aquí se implementará la lógica de búsqueda
}
</script>

<style scoped>
.search-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.search-content {
  margin-top: 2rem;
}

.search-box {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.search-input {
  flex: 1;
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.search-input:focus {
  outline: none;
  border-color: #007bff;
}

.search-button {
  background: #007bff;
  color: white;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}

.search-button:hover {
  background: #0056b3;
}

.search-results {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}
</style>
