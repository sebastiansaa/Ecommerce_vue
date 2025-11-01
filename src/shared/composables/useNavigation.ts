import { ref, computed } from 'vue'
import { useNavStore } from '@/stores/useNavStore'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useNavLogic } from '@/shared/composables/useNavLogic'

export function useNavigation() {
  const router = useRouter()
  const navStore = useNavStore()
  const { locale } = useI18n()
  const { toggleLang: toggleLangLogic } = useNavLogic()

  // Variable local reactiva para el idioma actual
  const currentLang = ref(locale.value)

  // Computed para mostrar el texto correcto
  const langText = computed(() => currentLang.value === 'en' ? 'EN' : 'ES')

  // Funciones comunes
  function handleCategory(category: string, closeMenu = false) {
    navStore.setCategory(category)
    router.push(`/products/${category}`)
    if (closeMenu) {
      // Lógica para cerrar menú móvil si es necesario
    }
  }

  function handleSection(section: string, closeMenu = false) {
    navStore.setCurrentSection(section)
    switch (section) {
      case 'about':
        router.push('/about');
        break;
      case 'stores':
        router.push('/stores');
        break;
      case 'login':
        router.push('/login');
        break;
      case 'payment':
        router.push('/payment');
        break;
      case 'log':
        router.push('/log');
        break;
      case 'faq':
        router.push('/faq');
        break;
      case 'cart':
        router.push('/cart');
        break;
      case 'wishlist':
        router.push('/wishlist');
        break;
      case 'search':
        router.push('/search');
        break;
      case 'home':
        router.push('/');
        break;
      default:
        break;
    }
    if (closeMenu) {
      // Lógica para cerrar menú móvil si es necesario
    }
  }

  function toggleLang() {
    const newLang = toggleLangLogic(currentLang.value)
    currentLang.value = newLang
    locale.value = newLang
  }

  return {
    // Estado
    currentLang,
    langText,

    // Funciones
    handleCategory,
    handleSection,
    toggleLang,

    // Stores y router
    navStore,
    router
  }
}
