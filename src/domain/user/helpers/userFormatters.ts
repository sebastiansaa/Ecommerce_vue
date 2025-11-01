// Helpers para formatear y mostrar datos de usuario
import type { User } from '@/domain/auth/interface/User'

export function formatUserName(user: User | null | undefined): string {
  if (!user) return ''
  return user.name?.trim() || user.email?.split('@')[0] || 'Usuario'
}

export function formatUserEmail(user: User | null | undefined): string {
  if (!user) return ''
  return user.email || ''
}

export function getUserRoleLabel(user: User | null | undefined): string {
  if (!user) return ''
  switch (user.role) {
    case 'admin':
      return 'Administrador'
    case 'customer':
      return 'Cliente'
    default:
      return user.role
  }
}
