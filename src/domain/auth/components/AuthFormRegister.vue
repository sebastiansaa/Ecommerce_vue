<template>
  <form @submit.prevent="handleSubmit" class="auth-form">
    <FormInput
      id="name"
      type="text"
      :label="$t('auth.name')"
      v-model="form.name"
      :error="errors.name"
      :disabled="loading"
      placeholder="Tu nombre"
      required
    />
    <FormInput
      id="reg-email"
      type="email"
      :label="$t('auth.email')"
      v-model="form.email"
      :error="errors.email"
      :disabled="loading"
      placeholder="tu@email.com"
      required
    />
    <PasswordInput
      id="reg-password"
      :label="$t('auth.password')"
      v-model="form.password"
      :error="errors.password"
      :disabled="loading"
      :is-visible="isVisible"
      :toggle-visibility="toggleVisibility"
      required
    />
    <PasswordInput
      id="reg-repeat-password"
      :label="$t('auth.repeatPassword')"
      v-model="form.repeatPassword"
      :error="errors.repeatPassword"
      :disabled="loading"
      :is-visible="isVisible"
      :toggle-visibility="toggleVisibility"
      required
    />
    <p v-if="error" class="error-message">{{ error }}</p>
    <SubmitButton :text="$t('auth.register')" :loading="loading" :disabled="loading" />
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { register } from '@/domain/auth/services/registerService'
import { useAuthStore } from '@/domain/auth/store/useAuthStore'
import { getRegisterSchema } from '@/domain/auth/schema/registerSchema'
import { usePasswordToggleStoreComposable, useFormHandler } from '@/shared/composables'
import { FormInput, PasswordInput, SubmitButton } from '@/shared/components/form'

const { t } = useI18n()
const { isVisible, toggleVisibility } = usePasswordToggleStoreComposable()
const authStore = useAuthStore()

const form = ref({ name: '', email: '', password: '', repeatPassword: '' })
const errors = ref({ name: '', email: '', password: '', repeatPassword: '' })
const error = ref('')
const loading = ref(false)

const registerSchema = getRegisterSchema()
const { validateAndClear } = useFormHandler(
  registerSchema,
  ['name', 'email', 'password', 'repeatPassword'] as const,
  errors,
  form,
)

async function handleSubmit() {
  error.value = ''

  if (!validateAndClear()) {
    return
  }

  loading.value = true
  try {
    const res = await register(form.value.name, form.value.email, form.value.password)
    const { access_token } = res.data as { access_token: string }
    authStore.setToken(access_token)
  } catch (e: any) {
    error.value = t('auth.register_error')
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
