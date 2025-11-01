// ⚠️ ============================================================================
// ⚠️ WARNING: MOCK AUTHENTICATION - TEMPORARY DEVELOPMENT ONLY
// ⚠️ ============================================================================
// ⚠️ Este archivo contiene credenciales mockeadas para desarrollo local
// ⚠️ DEBE SER ELIMINADO antes de producción
// ⚠️ Propósito: Permitir acceso cuando la API externa no está disponible
// ⚠️
// ⚠️ Para eliminar este mock:
// ⚠️ 1. Borrar este archivo (mockAuthService.ts)
// ⚠️ 2. Eliminar la importación en loginService.ts
// ⚠️ 3. Eliminar la llamada a checkMockCredentials() en loginService.ts
// ⚠️ ============================================================================

import type { UserProfile } from '@/domain/user/interface'

/**
 * ⚠️ MOCK CREDENTIALS - SOLO PARA DESARROLLO
 * Email: Admin@admin.com
 * Password: Seba1234
 */
const MOCK_CREDENTIALS = {
  email: 'Admin@admin.com',
  password: 'Seba1234',
} as const

/**
 * ⚠️ MOCK USER DATA - SOLO PARA DESARROLLO
 * Este usuario es ficticio y simula la respuesta de la API
 */
const MOCK_USER: UserProfile = {
  id: '999999',
  name: 'Admin Mock',
  email: 'Admin@admin.com',
  role: 'admin',
  avatar: 'https://i.imgur.com/yhW6Yw1.jpg',
}

/**
 * ⚠️ MOCK ACCESS TOKEN - SOLO PARA DESARROLLO
 * Este token es ficticio y no tiene validez real
 */
const MOCK_ACCESS_TOKEN = 'mock-access-token-for-development-only'

/**
 * ⚠️ MOCK REFRESH TOKEN - SOLO PARA DESARROLLO
 * Este token es ficticio y no tiene validez real
 */
const MOCK_REFRESH_TOKEN = 'mock-refresh-token-for-development-only'

/**
 * ⚠️ FUNCIÓN MOCK - VERIFICAR CREDENCIALES
 * Verifica si las credenciales ingresadas coinciden con las credenciales mock
 *
 * @param email - Email ingresado por el usuario
 * @param password - Contraseña ingresada por el usuario
 * @returns true si las credenciales son las mock, false en caso contrario
 */
export function isMockCredentials(email: string, password: string): boolean {
  console.log('🔍 Checking mock credentials:')
  console.log('  Expected email:', MOCK_CREDENTIALS.email)
  console.log('  Received email:', email)
  console.log('  Match email:', email === MOCK_CREDENTIALS.email)
  console.log('  Expected password:', MOCK_CREDENTIALS.password)
  console.log('  Received password:', password)
  console.log('  Match password:', password === MOCK_CREDENTIALS.password)

  const isMatch = email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password
  console.log('  Final result:', isMatch)
  return isMatch
}

/**
 * ⚠️ FUNCIÓN MOCK - LOGIN
 * Simula una respuesta exitosa de login con datos ficticios
 * Retorna en el formato de AxiosResponse para compatibilidad
 *
 * @returns Objeto simulando AxiosResponse con access_token y refresh_token
 */
export function mockLogin() {
  console.warn(
    '⚠️ MOCK AUTH: Usando credenciales mockeadas. Este comportamiento debe ser eliminado en producción.',
  )

  // Simula el formato de respuesta de Axios
  return {
    data: {
      access_token: MOCK_ACCESS_TOKEN,
      refresh_token: MOCK_REFRESH_TOKEN,
    },
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {} as any,
  }
}/**
 * ⚠️ FUNCIÓN MOCK - GET PROFILE
 * Simula una respuesta exitosa de obtener perfil con datos ficticios
 *
 * @returns Usuario mockeado
 */
export function mockGetProfile(): UserProfile {
  console.warn(
    '⚠️ MOCK AUTH: Retornando perfil mockeado. Este comportamiento debe ser eliminado en producción.',
  )

  return MOCK_USER
}
