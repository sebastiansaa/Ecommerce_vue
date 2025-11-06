<template>
  <form @submit.prevent="handleSubmit" class="auth-form">
    <!-- ⚠️ MOCK CREDENTIALS INFO - ELIMINAR EN PRODUCCIÓN -->
    <div class="mock-credentials-banner">
      <div class="mock-icon">⚠️</div>
      <div class="mock-content">
        <strong>MOCK CREDENTIALS (DEV ONLY)</strong>
        <p>Email: <code>Admin@admin.com</code></p>
        <p>Password: <code>Seba1234</code></p>
      </div>
    </div>
    <!-- ⚠️ FIN MOCK BANNER -->

    <FormInput
      id="email"
      type="email"
      :label="$t('auth.email')"
      v-model="form.email"
      :error="errors.email"
      :disabled="loading"
      placeholder="tu@email.com"
      required
    />
    <PasswordInput
      id="password"
      :label="$t('auth.password')"
      v-model="form.password"
      :error="errors.password"
      :disabled="loading"
      :is-visible="isVisible"
      :toggle-visibility="toggleVisibility"
      required
    />
    <p v-if="error" class="error-message">{{ error }}</p>
    <SubmitButton :text="$t('auth.login')" :loading="loading" :disabled="loading" />
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { login } from '@/domain/auth/services/loginService'
import { getProfile } from '@/domain/auth/services'
import { useAuthStore } from '@/domain/auth/store/useAuthStore'
import { getLoginSchema } from '@/domain/auth/schema/loginSchema'
import { usePasswordToggleStoreComposable, useFormHandler } from '@/shared/composables'
import { FormInput, PasswordInput, SubmitButton } from '@/shared/components/form'

const { t } = useI18n()
const router = useRouter()
const { isVisible, toggleVisibility } = usePasswordToggleStoreComposable()
const authStore = useAuthStore()

// Estado del formulario
const form = ref({ email: '', password: '' })
const errors = ref({ email: '', password: '' })
const error = ref('')
const loading = ref(false)

// Validación con Zod
const loginSchema = getLoginSchema()
const { validateAndClear } = useFormHandler(
  loginSchema,
  ['email', 'password'] as const,
  errors,
  form,
)

async function handleSubmit() {
  error.value = ''

  // Validar con Zod
  if (!validateAndClear()) {
    return
  }

  loading.value = true
  try {
    // 1. Login y obtener token
    const res = await login(form.value.email, form.value.password)
    const { access_token } = res.data as { access_token: string }
    authStore.setToken(access_token)

    // 2. Obtener perfil del usuario
    const user = await getProfile(access_token)
    authStore.setUser(user)

    // 3. Fusionar carrito de invitado con carrito de usuario
    const { useCartStore } = await import('@/domain/cart/store/useCartStore')
    const cartStore = useCartStore()
    await cartStore.mergeGuestCart()

    // 4. Redirigir al perfil de usuario
    console.log('✅ Login successful, redirecting to /user')
    router.push({ name: 'user' })
  } catch (e: any) {
    error.value = t('auth.login_error')
    console.error('❌ Login error:', e)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* ⚠️ MOCK CREDENTIALS BANNER - ELIMINAR EN PRODUCCIÓN */
.mock-credentials-banner {
  background: linear-gradient(135deg, #fff3cd 0%, #fff8e1 100%);
  border: 2px dashed #ff9800;
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  animation: pulse-warning 2s ease-in-out infinite;
}

@keyframes pulse-warning {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(255, 152, 0, 0.4);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(255, 152, 0, 0);
  }
}

.mock-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.mock-content {
  flex: 1;
}

.mock-content strong {
  color: #e65100;
  font-size: 0.85rem;
  display: block;
  margin-bottom: 0.5rem;
}

.mock-content p {
  margin: 0.25rem 0;
  font-size: 0.85rem;
  color: #5d4037;
}

.mock-content code {
  background: rgba(0, 0, 0, 0.1);
  padding: 0.15rem 0.4rem;
  border-radius: 0.25rem;
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  color: #d84315;
  font-weight: 600;
}
/* ⚠️ FIN ESTILOS MOCK BANNER */

.error-message {
  color: #e53e3e;
  font-size: 0.9rem;
  margin: 0;
  text-align: center;
}
</style>
