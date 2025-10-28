import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';
import type { VueQueryPluginOptions } from '@tanstack/vue-query';

import { createI18n } from 'vue-i18n';
import messages from './locales';

import App from './App.vue';
import router from './router';

import './assets/main.css';

const app = createApp(App);
const pinia = createPinia();
const queryClient = new QueryClient();

const vueQueryOptions: VueQueryPluginOptions = {
  queryClient
};

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('user-locale') || 'en',
  fallbackLocale: 'es',
  messages
});

app.use(pinia);
app.use(router);
app.use(VueQueryPlugin, vueQueryOptions);
app.use(i18n);

app.use(Toast, {
  position: 'top-right',
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
});

app.mount('#app');
