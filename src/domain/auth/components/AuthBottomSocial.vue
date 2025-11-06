<template>
  <div class="social-buttons">
    <GoogleButton @click="onGoogle" />
    <FacebookButton @click="onFacebook" />
  </div>
</template>

<script setup lang="ts">
import { useAuthSocial } from '@/domain/auth/Composable/useAuthSocial'
import { GoogleButton, FacebookButton } from '@/shared/components/ui'

const { loginWithGoogle, loginWithFacebook, isLoadingGoogle, isLoadingFacebook } = useAuthSocial()

async function onGoogle() {
  try {
    // Aquí deberías obtener el token de Google y pasarlo
    await loginWithGoogle('GOOGLE_TOKEN')
    // Manejar éxito del login
  } catch (error) {
    console.error('Error al iniciar sesión con Google:', error)
  }
}

async function onFacebook() {
  try {
    // Aquí deberías obtener el token de Facebook y pasarlo
    await loginWithFacebook('FACEBOOK_TOKEN')
    // Manejar éxito del login
  } catch (error) {
    console.error('Error al iniciar sesión con Facebook:', error)
  }
}
</script>

<style scoped>
.social-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}

.social-buttons button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.85rem 1.5rem;
  border: 1.5px solid #e0e0e0;
  background: white;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  color: #333;
}

.social-buttons button:hover {
  /* No more rules, style ends here */
  background: #f8f9ff;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.social-buttons button:active {
  transform: translateY(0);
}
</style>
