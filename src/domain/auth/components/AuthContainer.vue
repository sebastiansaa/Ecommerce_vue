<template>
  <section class="auth-view">
    <div class="auth-container">
      <!-- Login Form -->
      <div v-if="!showRegisterDrawer" class="auth-content">
        <h1 class="auth-title">{{ $t('auth.loginTitle') }}</h1>
        <AuthBottomSocial class="mb-4" />
        <AuthFormLogin @open-register="openRegisterDrawer" />
        <div class="auth-switch">
          <span>
            {{ $t('auth.no_account') }}
            <button class="link" type="button" @click="goRegister">
              {{ $t('auth.register_link') }}
            </button>
          </span>
        </div>
      </div>

      <!-- Register Form -->
      <div v-else class="auth-content">
        <h1 class="auth-title">{{ $t('auth.registerTitle') }}</h1>
        <AuthFormRegister @close="closeRegisterDrawer" />
        <div class="auth-switch">
          <span>
            {{ $t('auth.have_account') }}
            <button class="link" type="button" @click="closeRegisterDrawer">
              {{ $t('auth.login_link') }}
            </button>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthFormLogin from './AuthFormLogin.vue'
import AuthFormRegister from './AuthFormRegister.vue'
import AuthBottomSocial from './AuthBottomSocial.vue'
import { SHARED_CONFIG } from '@/shared/config/shared.config'

const showRegisterDrawer = ref(false)
const route = useRoute()
const router = useRouter()

function openRegisterDrawer() {
  showRegisterDrawer.value = true
}
function closeRegisterDrawer() {
  showRegisterDrawer.value = false
  router.push({ name: 'login' })
}
function goRegister() {
  router.push({ name: 'register' })
}

watch(
  () => route.meta.openRegister,
  (open) => {
    if (open) showRegisterDrawer.value = true
  },
  { immediate: true },
)
</script>

<style scoped>
/* Desktop por defecto (≥1024px según SHARED_CONFIG.breakpoints.desktop) */
.auth-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 125px);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-top: 3rem;
  box-sizing: border-box;
}

.auth-container {
  background: #fff;
  padding: 2rem 1.5rem;
  border-radius: 1.25rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
}

.auth-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.auth-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
}

.mb-4 {
  margin-bottom: 1rem;
}

.auth-switch {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.95rem;
  color: #666;
}

.auth-switch .link {
  background: none;
  border: none;
  color: #667eea;
  cursor: pointer;
  text-decoration: none;
  font-weight: 600;
  padding: 0 0.25em;
  transition: color 0.2s;
}

.auth-switch .link:hover {
  color: #764ba2;
  text-decoration: underline;
}

/* Tablet (768px - 1023px según SHARED_CONFIG.breakpoints) */
@media (min-width: 768px) and (max-width: 1023px) {
  .auth-view {
    min-height: calc(100vh - 145px);
    padding-top: 2rem;
  }

  .auth-container {
    max-width: 100%;
    padding: 1.75rem 1.25rem;
  }
}

/* Mobile (≤767px según SHARED_CONFIG.breakpoints.mobile) */
@media (max-width: 767px) {
  .auth-view {
    min-height: calc(100vh - 145px);
    padding-top: 1.5rem;
  }

  .auth-container {
    padding: 1.5rem 1rem;
    border-radius: 0.75rem;
  }

  .auth-title {
    font-size: 1.65rem;
  }
}
</style>
