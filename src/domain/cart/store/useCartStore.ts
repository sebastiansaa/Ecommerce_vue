import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { CartItem, CartState } from '../interface'
import type { ProductInterface } from '@/domain/products/products/interface/ProductsInterface'
import { useAuthStore } from '@/domain/auth/store/useAuthStore'

const CART_STORAGE_KEY = 'guest_cart'

export const useCartStore = defineStore('cart', () => {
  const authStore = useAuthStore()
  const items = ref<CartItem[]>([])

  // Cargar carrito inicial (localStorage para invitados o del backend para usuarios autenticados)
  function loadCart() {
    if (authStore.isAuthenticated && authStore.user) {
      // TODO: Cargar carrito del backend usando el userId
      // const userCart = await fetchUserCart(authStore.user.id)
      // items.value = userCart
      loadGuestCart() // Temporal hasta implementar backend
    } else {
      loadGuestCart()
    }
  }

  // Cargar carrito de invitado desde localStorage
  function loadGuestCart() {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (savedCart) {
      try {
        items.value = JSON.parse(savedCart)
      } catch (error) {
        console.error('Error loading guest cart:', error)
        items.value = []
      }
    }
  }

  // Guardar carrito en localStorage (para invitados) o backend (para usuarios autenticados)
  function saveCart() {
    if (authStore.isAuthenticated && authStore.user) {
      // TODO: Guardar carrito en el backend usando el userId
      // await saveUserCart(authStore.user.id, items.value)
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items.value)) // Temporal
    } else {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items.value))
    }
  }

  // Fusionar carrito de invitado con carrito de usuario al hacer login
  async function mergeGuestCart() {
    const guestCart = localStorage.getItem(CART_STORAGE_KEY)
    if (guestCart && authStore.isAuthenticated) {
      try {
        const guestItems: CartItem[] = JSON.parse(guestCart)

        // TODO: Fusionar con carrito del backend
        // const userCart = await fetchUserCart(authStore.user.id)
        // const merged = mergeCartItems(guestItems, userCart)
        // await saveUserCart(authStore.user.id, merged)

        // Temporal: Solo mantener items del invitado
        items.value = guestItems
        localStorage.removeItem(CART_STORAGE_KEY)
        saveCart()
      } catch (error) {
        console.error('Error merging guest cart:', error)
      }
    }
  }

  // Watch para persistir cambios automáticamente
  watch(
    items,
    () => {
      saveCart()
    },
    { deep: true }
  )

  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => {
      return total + item.product.price * item.quantity
    }, 0)
  })

  const isEmpty = computed(() => items.value.length === 0)

  function addToCart(product: ProductInterface, quantity = 1) {
    const existingItem = items.value.find((item) => item.product.id === product.id)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      items.value.push({ product, quantity })
    }
  }

  function removeFromCart(productId: string) {
    const index = items.value.findIndex((item) => item.product.id === productId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  function updateQuantity(productId: string, quantity: number) {
    const item = items.value.find((item) => item.product.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
      }
    }
  }

  function clearCart() {
    items.value = []
    if (authStore.isAuthenticated) {
      // TODO: Limpiar carrito en el backend
      // await clearUserCart(authStore.user.id)
    } else {
      localStorage.removeItem(CART_STORAGE_KEY)
    }
  }

  // Convertir carrito en orden/compra
  async function checkout() {
    if (isEmpty.value) {
      throw new Error('El carrito está vacío')
    }

    if (!authStore.isAuthenticated) {
      throw new Error('Debes iniciar sesión para completar la compra')
    }

    // TODO: Crear orden en el backend
    // const order = await createOrder({
    //   userId: authStore.user.id,
    //   items: items.value,
    //   total: totalPrice.value,
    //   date: new Date()
    // })

    // Limpiar carrito después de crear la orden
    // clearCart()

    // return order

    console.log('Checkout - Crear orden con:', {
      userId: authStore.user?.id,
      items: items.value,
      total: totalPrice.value
    })
  }

  // Inicializar carrito al crear el store
  loadCart()

  return {
    items,
    totalItems,
    totalPrice,
    isEmpty,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    loadCart,
    mergeGuestCart,
    checkout,
  }
})

/**
 * Store de Pinia para gestionar el carrito de compras
 *
 * FUNCIONALIDAD:
 *
 * 1. USUARIO INVITADO:
 *    - El carrito se guarda en localStorage del navegador
 *    - Persiste entre sesiones hasta que se limpie el navegador
 *    - Key: 'guest_cart'
 *
 * 2. USUARIO AUTENTICADO:
 *    - El carrito se vincula al userId en el backend (TODO: implementar API)
 *    - Se sincroniza automáticamente con el servidor
 *    - Al hacer login, fusiona carrito de invitado con carrito del usuario
 *
 * 3. AL COMPRAR (checkout):
 *    - Los items del carrito se convierten en una orden/compra en el backend
 *    - Requiere usuario autenticado
 *    - El carrito se vacía después de crear la orden
 *
 * Estado:
 * - items: Lista de productos en el carrito con sus cantidades
 *
 * Computed:
 * - totalItems: Cantidad total de productos en el carrito
 * - totalPrice: Precio total de todos los productos
 * - isEmpty: Indica si el carrito está vacío
 *
 * Acciones principales:
 * - addToCart(product, quantity): Agrega un producto al carrito o incrementa su cantidad
 * - removeFromCart(productId): Elimina un producto del carrito
 * - updateQuantity(productId, quantity): Actualiza la cantidad de un producto
 * - clearCart(): Vacía completamente el carrito
 * - checkout(): Convierte el carrito en una orden y lo vacía
 * - mergeGuestCart(): Fusiona carrito de invitado con carrito de usuario al hacer login
 *
 * TODO (cuando implementes tu propio backend):
 * - fetchUserCart(userId): Cargar carrito del usuario desde el backend
 * - saveUserCart(userId, items): Guardar carrito del usuario en el backend
 * - createOrder(orderData): Crear orden/compra en el backend
 * - clearUserCart(userId): Limpiar carrito del usuario en el backend
 */

