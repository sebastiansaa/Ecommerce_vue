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
