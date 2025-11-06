/* Gestiona el estado global de navegación de la aplicación. Permite:
 * Guardar la categoría seleccionada (selectedCategory) para resaltar la categoría activa en el nav.
 * Controlar la sección actual (currentSection) para navegación interna.
 * Manejar la apertura/cierre del menú de categorías (isNavCatOpen).
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNavStore = defineStore('nav', () => {
  // State
  const selectedCategory = ref<string>('clothes')
  const currentSection = ref<string>('')
  const isNavCatOpen = ref<boolean>(false)

  // Actions
  function setCategory(category: string) {
    selectedCategory.value = category
  }

  function setCurrentSection(section: string) {
    currentSection.value = section
  }

  function toggleNavCat() {
    isNavCatOpen.value = !isNavCatOpen.value
  }

  return {
    // State
    selectedCategory,
    currentSection,
    isNavCatOpen,
    // Actions
    setCategory,
    setCurrentSection,
    toggleNavCat
  }
})
