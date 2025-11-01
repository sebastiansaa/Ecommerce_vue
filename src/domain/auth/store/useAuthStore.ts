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
import { v4 as uuidv4 } from 'uuid'
import type { User } from '../interface'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('auth_token') as string | null,
    refreshToken: localStorage.getItem('refresh_token') as string | null,
    user: JSON.parse(localStorage.getItem('auth_user') || 'null') as User | null,
    sessionId: uuidv4() as string,
  }),

  actions: {
    // Guarda el token de acceso en el estado y en localStorage
    setToken(token: string) {
      this.token = token
      localStorage.setItem('auth_token', token)
    },
    // Guarda el refresh token en el estado y en localStorage
    setRefreshToken(refreshToken: string) {
      this.refreshToken = refreshToken
      localStorage.setItem('refresh_token', refreshToken)
    },
    // Guarda el usuario autenticado en el estado y en localStorage
    setUser(user: User) {
      this.user = user
      localStorage.setItem('auth_user', JSON.stringify(user))
    },
    // Restaura la sesión desde localStorage y verifica expiración del token
    restoreSession() {
      this.token = localStorage.getItem('auth_token')
      this.refreshToken = localStorage.getItem('refresh_token')
      this.user = JSON.parse(localStorage.getItem('auth_user') || 'null')
      this.checkAndHandleTokenExpiration();
    },

    // Decodifica el JWT y retorna el payload (o null si no es válido)
    decodeJwt(token: string | null): any {
      if (!token) return null;
      try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        const base64Url = parts[1];
        if (!base64Url) return null;
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
      } catch (e) {
        return null;
      }
    },

    // Verifica si el token está expirado y actúa en consecuencia
    checkAndHandleTokenExpiration() {
      if (!this.token) return;
      const payload = this.decodeJwt(this.token);
      if (payload && payload.exp) {
        const now = Math.floor(Date.now() / 1000);
        if (payload.exp < now) {
          // Token expirado
          if (this.refreshToken) {
            this.refreshAuthToken();
          } else {
            this.logout();
          }
        }
      }
    },
    // Elimina toda la información de sesión y limpia localStorage
    logout() {
      this.token = null
      this.refreshToken = null
      this.user = null
      this.sessionId = uuidv4()
      localStorage.removeItem('auth_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('auth_user')
    },
    // Intenta refrescar el token de acceso usando el refresh token
    async refreshAuthToken() {
      //  asume que hay un endpoint /auth/refresh que acepta el refresh token. Hacerlo en el backend.
      if (!this.refreshToken) return
      try {
        // Reemplaza esto por tu llamada real al backend
        const response = await fetch('/auth/refresh', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken: this.refreshToken })
        })
        const data = await response.json()
        if (data.token) {
          this.setToken(data.token)
        }
        if (data.refreshToken) {
          this.setRefreshToken(data.refreshToken)
        }
      } catch (e) {
        this.logout()
      }
    },
  },

  getters: {
    // Verifica si el usuario está autenticado
    isAuthenticated: (state) => !!state.token,

    // Verifica si el token está expirado
    isTokenExpired: (state) => {
      if (!state.token) return true;
      try {
        const parts = state.token.split('.');
        if (parts.length !== 3) return true;
        const base64Url = parts[1];
        if (!base64Url) return true;
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const payload = JSON.parse(jsonPayload);
        const now = Math.floor(Date.now() / 1000);
        return payload.exp < now;
      } catch (e) {
        return true;
      }
    },

    // Verifica si el usuario tiene un rol específico
    hasRole: (state) => (role: string) => {
      return state.user?.role === role;
    },

    // Verifica si el usuario es administrador
    isAdmin: (state) => {
      return state.user?.role === 'admin';
    },

    // Verifica si el usuario es cliente
    isCustomer: (state) => {
      return state.user?.role === 'customer';
    },
  },
})
