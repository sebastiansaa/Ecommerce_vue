import { useRouter } from 'vue-router'

export function useNavLogic() {
  const router = useRouter()

  const toggleLang = (currentLocale: string) => {
    const newLocale = currentLocale === 'en' ? 'es' : 'en'

    localStorage.setItem('user-locale', newLocale)
    return newLocale
  }

  const goHome = () => {
    router.push('/')
  }

  return {
    toggleLang,
    goHome,
  }
}
