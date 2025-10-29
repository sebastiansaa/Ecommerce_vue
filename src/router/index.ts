import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import StoresView from '../views/StoresView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/stores',
      name: 'stores',
      component: StoresView,
    },
    {
      path: '/products/:category',
      name: 'ProductsByCategory',
      component: () => import('@/domain/products/products/views/ProductsView.vue')
    },
    {
      path: '/products/:category/:id',
      name: 'ProductDetail',
      component: () => import('@/domain/products/products/views/ProductDetailView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/domain/user/views/UserView.vue')
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import('@/domain/payment/views/PaymentView.vue')
    },
    {
      path: '/log',
      name: 'log',
      component: () => import('@/domain/log/views/LogView.vue')
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('@/views/FaqView.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/CartView.vue')
    },
  ],
})

export default router
