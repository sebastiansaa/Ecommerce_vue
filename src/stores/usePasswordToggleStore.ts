//para gestionar la visibilidad de contraseñas, ver el composable asociado "usePasswordToggle"
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePasswordToggleStore = defineStore('passwordToggle', () => {
  // State
  const isVisible = ref<boolean>(false)

  // Actions
  function toggleVisibility() {
    isVisible.value = !isVisible.value
  }

  function setVisibility(value: boolean) {
    isVisible.value = value
  }

  return {
    // State
    isVisible,
    // Actions
    toggleVisibility,
    setVisibility
  }
}, {
  persist: {
    key: 'password-visible',
    storage: localStorage,
  },
})
