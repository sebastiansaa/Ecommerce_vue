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
      component: () => import('@/domain/auth/views/authView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/domain/auth/views/authView.vue'),
      meta: { openRegister: true }
    },

    {
      path: '/payment/buy-now',
      name: 'buy-now-checkout',
      component: () => import('@/domain/payment/views/BuyNowCheckoutView.vue')
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
    {
      path: '/wishlist',
      name: 'wishlist',
      component: () => import('@/domain/products/WishList/views/WishListView.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/domain/account/views/AccountView.vue'),
      children: [
        {
          path: 'orders',
          name: 'user-orders',
          component: () => import('@/domain/order/views/OrdersView.vue')
        },
        {
          path: 'orders/:id',
          name: 'user-order-detail',
          component: () => import('@/domain/order/views/OrderDetailView.vue')
        },
        {
          path: 'wishlist',
          name: 'user-wishlist',
          component: () => import('@/domain/products/WishList/views/WishListView.vue')
        },
        // Ruta de reviews eliminada, la vista de usuario está en account
      ]
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('@/domain/account/views/AccountView.vue')
    },
  ],
})

export default router
