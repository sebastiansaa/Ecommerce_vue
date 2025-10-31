<template>
  <div class="social-buttons">
    <button @click="onGoogle" aria-label="Google login" type="button">
      <span class="icon-google">
        <!-- SVG Google -->
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M21.35 11.1h-9.18v2.92h5.27c-.23 1.23-1.41 3.6-5.27 3.6-3.17 0-5.76-2.62-5.76-5.82s2.59-5.82 5.76-5.82c1.81 0 3.03.77 3.73 1.43l2.55-2.48C16.13 3.54 14.3 2.7 12.17 2.7 6.99 2.7 2.7 7.01 2.7 12.19s4.29 9.49 9.47 9.49c5.47 0 9.09-3.85 9.09-9.28 0-.62-.07-1.09-.16-1.3z"
          />
        </svg>
      </span>
      Google
    </button>
    <button @click="onFacebook" aria-label="Facebook login" type="button">
      <span class="icon-facebook">
        <!-- SVG Facebook -->
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="#1877F3"
            d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"
          />
        </svg>
      </span>
      Facebook
    </button>
  </div>
</template>

<script setup lang="ts">
import { useAuthSocial } from '@/domain/auth/Composable/useAuthSocial'
const { loginWithGoogle, loginWithFacebook } = useAuthSocial()

function onGoogle() {
  // Aquí deberías obtener el token de Google y pasarlo
  loginWithGoogle.mutate('GOOGLE_TOKEN')
}
function onFacebook() {
  // Aquí deberías obtener el token de Facebook y pasarlo
  loginWithFacebook.mutate('FACEBOOK_TOKEN')
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
  border-color: #667eea;
  background: #f8f9ff;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.social-buttons button:active {
  transform: translateY(0);
}

.icon-google,
.icon-facebook {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .social-buttons {
    gap: 0.65rem;
  }

  .social-buttons button {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }
}
</style>
