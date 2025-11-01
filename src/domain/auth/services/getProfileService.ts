import { API_BASE_URL } from '@/shared/api/api'
import type { User } from '@/domain/auth/interface/User'
import axios from 'axios'
// ⚠️ MOCK IMPORT - ELIMINAR EN PRODUCCIÓN
import { mockGetProfile } from './mockAuthService'

export async function getProfile(token: string): Promise<User> {
  console.log('🔍 Getting profile with token:', token)

  // ⚠️ ============================================================================
  // ⚠️ MOCK AUTH CHECK - ELIMINAR TODO ESTE BLOQUE EN PRODUCCIÓN
  // ⚠️ ============================================================================
  // ⚠️ Si el token es el token mock, retorna el usuario mock sin llamar a la API
  // ⚠️
  // ⚠️ Para eliminar:
  // ⚠️ 1. Borrar todo este bloque if
  // ⚠️ 2. Borrar la importación de mockAuthService arriba
  // ⚠️ ============================================================================
  if (token === 'mock-access-token-for-development-only') {
    console.log('✅ Mock token detected, returning mock user')
    return mockGetProfile() as User
  }
  console.log('❌ Not mock token, calling real API')
  // ⚠️ FIN DEL BLOQUE MOCK
  // ⚠️ ============================================================================

  const { data } = await axios.get(`${API_BASE_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}
