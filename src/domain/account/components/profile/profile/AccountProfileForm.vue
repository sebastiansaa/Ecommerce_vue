<template>
  <form class="user-profile-form" @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="name">Nombre</label>
      <input v-model="form.name" id="name" type="text" />
      <span v-if="errors.name" class="error">{{ errors.name }}</span>
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input v-model="form.email" id="email" type="email" />
      <span v-if="errors.email" class="error">{{ errors.email }}</span>
    </div>
    <div class="form-group">
      <label for="avatar">Avatar (URL)</label>
      <input v-model="form.avatar" id="avatar" type="text" />
      <span v-if="errors.avatar" class="error">{{ errors.avatar }}</span>
    </div>
    <button type="submit">Guardar cambios</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/domain/auth/store/useAuthStore'
import { useFormHandler } from '@/shared/composables/useFormHandler'
import { z } from 'zod'
import { updateProfile } from '@/domain/account/services/accountService'
import { useMutation } from '@tanstack/vue-query'
import { useErrorHandler } from '@/shared/composables/useErrorHandler'
import type { AccountProfile } from '@/domain/account/interfaces/AccountProfile'

const authStore = useAuthStore()
const user = authStore.user
const { handleSuccess, handleError } = useErrorHandler()

const form = ref({
  name: user?.name || '',
  email: user?.email || '',
  avatar: user?.avatar || '',
})

const errors = ref({
  name: '',
  email: '',
  avatar: '',
})

const schema = z.object({
  name: z.string().min(2, 'El nombre es requerido'),
  email: z.string().email('Email inválido'),
  avatar: z.string().url('Debe ser una URL válida').or(z.literal('')),
})

const fields = ['name', 'email', 'avatar'] as const

const { validateAndClear } = useFormHandler(schema, fields, errors, form)

const mutation = useMutation({
  mutationFn: async (payload: typeof form.value) => {
    if (!user) throw new Error('No user')
    const userProfile: AccountProfile = {
      id: user.id,
      name: payload.name,
      email: payload.email,
      avatar: payload.avatar,
      role: user.role,
    }
    return await updateProfile(userProfile)
  },
  onSuccess: (result) => {
    authStore.setUser(result as any)
    handleSuccess('Perfil actualizado')
  },
  onError: (e) => {
    handleError(e, 'Actualizar perfil')
  },
})

function onSubmit() {
  if (!validateAndClear()) return
  mutation.mutate({ ...form.value })
}
</script>

<style scoped>
.user-profile-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
}
.form-group {
  display: flex;
  flex-direction: column;
}
label {
  font-weight: 500;
  margin-bottom: 0.25rem;
}
input {
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;
}
.error {
  color: #e53e3e;
  font-size: 0.9rem;
}
button[type='submit'] {
  background: #667eea;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
button[type='submit']:hover {
  background: #5a67d8;
}
</style>
