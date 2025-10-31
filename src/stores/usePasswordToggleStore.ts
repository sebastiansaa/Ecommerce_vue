//para gestionar la visibilidad de contraseñas, ver el composable asociado "usePasswordToggle"
import { defineStore } from 'pinia'

export const usePasswordToggleStore = defineStore('passwordToggle', {
  state: () => ({
    isVisible: false,
  }),
  actions: {
    toggleVisibility() {
      this.isVisible = !this.isVisible
    },
    setVisibility(value: boolean) {
      this.isVisible = value
    },
  },
  persist: {
    key: 'password-visible',
    storage: localStorage,
  },
})
