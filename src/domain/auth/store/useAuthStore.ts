// Store de autenticación: Single Source of Truth para el usuario autenticado
// Responsabilidades:
// - Gestionar token JWT, refresh token y sesión
// - Persistir y restaurar usuario en localStorage
// - Manejar login, logout y refresco de token
// - Proveer información de roles y estado de autenticación
//
// IMPORTANTE: Este es el ÚNICO lugar donde se almacena el usuario autenticado.
// Otros dominios (user, admin, etc.) deben consumir este store, NO duplicar el estado.

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import type { User } from '../interface'

export const useAuthStore = defineStore('auth', () => {
  // State
  const token = ref<string | null>(localStorage.getItem('auth_token'))
  const refreshToken = ref<string | null>(localStorage.getItem('refresh_token'))
  const user = ref<User | null>(JSON.parse(localStorage.getItem('auth_user') || 'null'))
  const sessionId = ref<string>(uuidv4())

  // Getters
  const isAuthenticated = computed(() => !!token.value)

  const isTokenExpired = computed(() => {
    if (!token.value) return true
    try {
      const parts = token.value.split('.')
      if (parts.length !== 3) return true
      const base64Url = parts[1]
      if (!base64Url) return true
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          })
          .join('')
      )
      const payload = JSON.parse(jsonPayload)
      const now = Math.floor(Date.now() / 1000)
      return payload.exp < now
    } catch (e) {
      return true
    }
  })

  const hasRole = computed(() => (role: string) => user.value?.role === role)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isCustomer = computed(() => user.value?.role === 'customer')

  // Actions
  function setToken(newToken: string) {
    token.value = newToken
    localStorage.setItem('auth_token', newToken)
  }

  function setRefreshToken(newRefreshToken: string) {
    refreshToken.value = newRefreshToken
    localStorage.setItem('refresh_token', newRefreshToken)
  }

  function setUser(newUser: User) {
    user.value = newUser
    localStorage.setItem('auth_user', JSON.stringify(newUser))
  }

  function restoreSession() {
    token.value = localStorage.getItem('auth_token')
    refreshToken.value = localStorage.getItem('refresh_token')
    user.value = JSON.parse(localStorage.getItem('auth_user') || 'null')
    checkAndHandleTokenExpiration()
  }

  function decodeJwt(tokenStr: string | null): any {
    if (!tokenStr) return null
    try {
      const parts = tokenStr.split('.')
      if (parts.length !== 3) return null
      const base64Url = parts[1]
      if (!base64Url) return null
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          })
          .join('')
      )
      return JSON.parse(jsonPayload)
    } catch (e) {
      return null
    }
  }

  function checkAndHandleTokenExpiration() {
    if (!token.value) return
    const payload = decodeJwt(token.value)
    if (payload && payload.exp) {
      const now = Math.floor(Date.now() / 1000)
      if (payload.exp < now) {
        // Token expirado
        if (refreshToken.value) {
          refreshAuthToken()
        } else {
          logout()
        }
      }
    }
  }

  async function logout() {
    // Limpiar carrito del usuario (opcional, o mantenerlo en el backend)
    try {
      const cartStore = await import('@/domain/cart/store/useCartStore')
      if (cartStore.useCartStore) {
        const cart = cartStore.useCartStore()
        // Opcional: limpiar el carrito al cerrar sesión
        // cart.clearCart()
        // O simplemente recargar para que pase a modo invitado
        cart.loadCart()
      }
    } catch (error) {
      console.error('Error handling cart on logout:', error)
    }

    localStorage.removeItem('auth_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('auth_user')
    token.value = null
    refreshToken.value = null
    user.value = null
  }

  async function refreshAuthToken() {
    // Asume que hay un endpoint /auth/refresh que acepta el refresh token. Hacerlo en el backend.
    if (!refreshToken.value) return
    try {
      // Reemplaza esto por tu llamada real al backend
      const response = await fetch('/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: refreshToken.value })
      })
      const data = await response.json()
      if (data.token) {
        setToken(data.token)
      }
      if (data.refreshToken) {
        setRefreshToken(data.refreshToken)
      }
    } catch (error) {
      console.error('Error al refrescar el token:', error)
      logout()
    }
  }

  return {
    // State
    token,
    refreshToken,
    user,
    sessionId,
    // Getters
    isAuthenticated,
    isTokenExpired,
    hasRole,
    isAdmin,
    isCustomer,
    // Actions
    setToken,
    setRefreshToken,
    setUser,
    restoreSession,
    decodeJwt,
    checkAndHandleTokenExpiration,
    logout,
    refreshAuthToken
  }
})

