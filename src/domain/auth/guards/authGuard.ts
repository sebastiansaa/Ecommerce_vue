//si el user está autenticado, permite el acceso a la ruta; si no, redirige al login

import { useAuthStore } from "@/domain/user/store/useAuthStore";

export function authGuard(to: any, from: any, next: any) {
  const authStore = useAuthStore();

  if (authStore.user) {
    next()
  } else {
    next('/login')
  }
}
