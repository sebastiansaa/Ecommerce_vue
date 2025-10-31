import { storeToRefs } from 'pinia'
import { usePasswordToggleStore } from '@/stores/usePasswordToggleStore'

/**
 * Composable para manejar la visibilidad de contraseñas usando Pinia.
 * El estado es global y persistente.
 */
export function usePasswordToggleStoreComposable() {
  const store = usePasswordToggleStore()
  const { isVisible } = storeToRefs(store)
  const { toggleVisibility, setVisibility } = store

  return {
    isVisible,
    toggleVisibility,
    setVisibility,
  }
}
