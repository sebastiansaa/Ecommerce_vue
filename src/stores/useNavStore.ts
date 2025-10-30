/* Gestiona el estado global de navegación de la aplicación. Permite:
 * Guardar la categoría seleccionada (selectedCategory) para resaltar la categoría activa en el nav.
 * Controlar la sección actual (currentSection) para navegación interna.
 * Manejar la apertura/cierre del menú de categorías (isNavCatOpen).
 */

import { defineStore } from "pinia";

export const useNavStore = defineStore("nav", {
  state: () => ({
    selectedCategory: 'clothes',
    currentSection: '',
    isNavCatOpen: false
  }),
  actions: {
    setCategory(category: string) {
      this.selectedCategory = category;
    },
    setCurrentSection(section: string) {
      this.currentSection = section;
    },
    toggleNavCat() {
      this.isNavCatOpen = !this.isNavCatOpen;
    }
  }
})
