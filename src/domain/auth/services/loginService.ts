import { axiosAutherizedAdapter } from '@/shared/api/axiosAuthorizedAdapter'
import { getLoginSchema } from '@/domain/auth/schema/loginSchema'
// ⚠️ MOCK IMPORT - ELIMINAR EN PRODUCCIÓN
import { isMockCredentials, mockLogin } from './mockAuthService'

export async function login(email: string, password: string) {
  // ⚠️ ============================================================================
  // ⚠️ MOCK AUTH CHECK - ELIMINAR TODO ESTE BLOQUE EN PRODUCCIÓN
  // ⚠️ ============================================================================
  // ⚠️ Verifica PRIMERO si se usan credenciales mockeadas (Admin@admin.com / Seba1234)
  // ⚠️ ANTES de validar con el schema, para evitar errores de validación
  // ⚠️ Si es así, retorna datos mock sin llamar a la API
  // ⚠️
  // ⚠️ Para eliminar:
  // ⚠️ 1. Borrar todo este bloque if
  // ⚠️ 2. Borrar la importación de mockAuthService arriba
  // ⚠️ 3. Dejar solo: const data = getLoginSchema().parse({ email, password })
  // ⚠️               return axiosAutherizedAdapter.post('/auth/login', data)
  // ⚠️ ============================================================================
  console.log('🔍 Login attempt:', { email, password })
  if (isMockCredentials(email, password)) {
    console.log('✅ Mock credentials detected!')
    return mockLogin()
  }
  console.log('❌ Not mock credentials, calling real API')
  // ⚠️ FIN DEL BLOQUE MOCK
  // ⚠️ ============================================================================

  const data = getLoginSchema().parse({ email, password })
  return axiosAutherizedAdapter.post('/auth/login', data)
}
