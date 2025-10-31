<template>
  <form @submit.prevent="handleSubmit" class="auth-form">
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
import { login } from '@/domain/auth/services/loginService'
import { useAuthStore } from '@/domain/auth/store/useAuthStore'
import { getLoginSchema } from '@/domain/auth/schema/loginSchema'
import { usePasswordToggleStoreComposable, useFormHandler } from '@/shared/composables'
import { FormInput, PasswordInput, SubmitButton } from '@/shared/components/form'

const { t } = useI18n()
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
    const res = await login(form.value.email, form.value.password)
    const { access_token } = res.data as { access_token: string }
    authStore.setToken(access_token)
    // Aquí podrías obtener el perfil y setUser
  } catch (e: any) {
    error.value = t('auth.login_error')
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

.error-message {
  color: #e53e3e;
  font-size: 0.9rem;
  margin: 0;
  text-align: center;
}
</style>
