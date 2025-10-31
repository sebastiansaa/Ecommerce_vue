<template>
  <form @submit.prevent="onSubmit" class="auth-form">
    <div class="form-group">
      <label for="name">{{ $t('auth.name') }}</label>
      <input
        v-model="form.name"
        id="name"
        type="text"
        required
        :disabled="loading"
        placeholder="Tu nombre"
      />
    </div>
    <div class="form-group">
      <label for="reg-email">{{ $t('auth.email') }}</label>
      <input
        v-model="form.email"
        id="reg-email"
        type="email"
        required
        :disabled="loading"
        placeholder="tu@email.com"
      />
    </div>
    <div class="form-group">
      <label for="reg-password">{{ $t('auth.password') }}</label>
      <input
        v-model="form.password"
        id="reg-password"
        type="password"
        required
        :disabled="loading"
        placeholder="••••••••"
      />
    </div>
    <p v-if="error" class="error-message">{{ error }}</p>
    <button type="submit" class="btn-submit" :disabled="loading">
      {{ loading ? 'Cargando...' : $t('auth.register') }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { register } from '@/domain/auth/services/registerService'
import { useAuthStore } from '@/domain/auth/store/useAuthStore'

const { t } = useI18n()
const form = ref({ name: '', email: '', password: '' })
const error = ref('')
const loading = ref(false)
const authStore = useAuthStore()

async function onSubmit() {
  error.value = ''
  loading.value = true
  try {
    const res = await register(form.value.name, form.value.email, form.value.password)
    const { access_token } = res.data as { access_token: string }
    authStore.setToken(access_token)
    // Aquí podrías obtener el perfil y setUser
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

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.95rem;
  font-weight: 600;
  color: #333;
}

.form-group input {
  padding: 0.85rem 1rem;
  border: 1.5px solid #e0e0e0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s;
  font-family: inherit;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.error-message {
  color: #e53e3e;
  font-size: 0.9rem;
  margin: 0;
  text-align: center;
}

.btn-submit {
  padding: 0.95rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  margin-top: 0.5rem;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.btn-submit:active:not(:disabled) {
  transform: translateY(0);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
