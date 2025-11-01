# ⚠️ MOCK AUTHENTICATION - INSTRUCCIONES DE ELIMINACIÓN

## ⚠️ ADVERTENCIA

Este proyecto contiene un sistema de autenticación mockeado **SOLO PARA DESARROLLO**.
**DEBE SER ELIMINADO** antes de pasar a producción.

## 📋 Credenciales Mock Actuales

- **Email**: `Admin@admin.com`
- **Password**: `Seba1234`

## 🎯 Propósito

Permitir acceso a la aplicación cuando la API externa no está disponible durante el desarrollo.

## 🗑️ Cómo Eliminar el Mock (Checklist)

### Paso 1: Eliminar el archivo mock

```bash
# Eliminar el archivo de servicio mock
rm src/domain/auth/services/mockAuthService.ts
```

### Paso 2: Limpiar loginService.ts

Abrir `src/domain/auth/services/loginService.ts` y:

**ANTES:**

```typescript
import { axiosAutherizedAdapter } from '@/shared/api/axiosAuthorizedAdapter'
import { getLoginSchema } from '@/domain/auth/schema/loginSchema'
// ⚠️ MOCK IMPORT - ELIMINAR EN PRODUCCIÓN
import { isMockCredentials, mockLogin } from './mockAuthService'

export async function login(email: string, password: string) {
  const data = getLoginSchema().parse({ email, password })

  // ⚠️ MOCK AUTH CHECK - TODO ESTE BLOQUE
  if (isMockCredentials(email, password)) {
    return mockLogin()
  }
  // ⚠️ FIN DEL BLOQUE MOCK

  return axiosAutherizedAdapter.post('/auth/login', data)
}
```

**DESPUÉS:**

```typescript
import { axiosAutherizedAdapter } from '@/shared/api/axiosAuthorizedAdapter'
import { getLoginSchema } from '@/domain/auth/schema/loginSchema'

export async function login(email: string, password: string) {
  const data = getLoginSchema().parse({ email, password })
  return axiosAutherizedAdapter.post('/auth/login', data)
}
```

### Paso 3: Limpiar getProfileService.ts

Abrir `src/domain/auth/services/getProfileService.ts` y:

**ANTES:**

```typescript
import { API_BASE_URL } from '@/shared/api/api'
import type { User } from '@/domain/auth/interface/User'
import axios from 'axios'
// ⚠️ MOCK IMPORT - ELIMINAR EN PRODUCCIÓN
import { mockGetProfile } from './mockAuthService'

export async function getProfile(token: string): Promise<User> {
  // ⚠️ MOCK AUTH CHECK - TODO ESTE BLOQUE
  if (token === 'mock-access-token-for-development-only') {
    return mockGetProfile() as User
  }
  // ⚠️ FIN DEL BLOQUE MOCK

  const { data } = await axios.get(`${API_BASE_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}
```

**DESPUÉS:**

```typescript
import { API_BASE_URL } from '@/shared/api/api'
import type { User } from '@/domain/auth/interface/User'
import axios from 'axios'

export async function getProfile(token: string): Promise<User> {
  const { data } = await axios.get(`${API_BASE_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}
```

### Paso 4: Limpiar AuthFormLogin.vue

Abrir `src/domain/auth/components/AuthFormLogin.vue` y eliminar el banner de credenciales mock:

**Eliminar en el template:**

```vue
<!-- ⚠️ MOCK CREDENTIALS INFO - ELIMINAR EN PRODUCCIÓN -->
<div class="mock-credentials-banner">
  <div class="mock-icon">⚠️</div>
  <div class="mock-content">
    <strong>MOCK CREDENTIALS (DEV ONLY)</strong>
    <p>Email: <code>Admin@admin.com</code></p>
    <p>Password: <code>Seba</code></p>
  </div>
</div>
<!-- ⚠️ FIN MOCK BANNER -->
```

**Eliminar en los estilos:**

```css
/* ⚠️ MOCK CREDENTIALS BANNER - ELIMINAR EN PRODUCCIÓN */
.mock-credentials-banner { ... }
@keyframes pulse-warning { ... }
.mock-icon { ... }
.mock-content { ... }
.mock-content strong { ... }
.mock-content p { ... }
.mock-content code { ... }
/* ⚠️ FIN ESTILOS MOCK BANNER */
```

### Paso 5: Eliminar este README

```bash
# Eliminar la documentación del mock
rm src/domain/auth/MOCK_AUTH_README.md
```

## ✅ Verificación Final

Después de eliminar todo:

- [ ] No existe `mockAuthService.ts`
- [ ] `loginService.ts` no tiene imports ni código mock
- [ ] `getProfileService.ts` no tiene imports ni código mock
- [ ] `AuthFormLogin.vue` no tiene el banner de credenciales mock
- [ ] No existe `MOCK_AUTH_README.md`
- [ ] La aplicación funciona correctamente con la API real

## 🔍 Buscar Otros Restos

Ejecutar en terminal para verificar que no queden referencias:

```bash
# Buscar cualquier mención a "mock" en el código
grep -r "mock" src/domain/auth/

# Debería retornar vacío o solo comentarios irrelevantes
```

---

**Última actualización**: 1 de noviembre de 2025  
**Estado**: ACTIVO - MOCK EN USO
