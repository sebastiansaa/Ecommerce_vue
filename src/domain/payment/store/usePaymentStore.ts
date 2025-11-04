import { defineStore } from 'pinia'
import type { ProductInterface } from '@/domain/products/products/interface/ProductsInterface'
import { useAuthStore } from '@/domain/auth/store/useAuthStore'
import { axiosAutherizedAdapter } from '@/shared/api/axiosAuthorizedAdapter'
import { getUuidForId } from '@/domain/products/products/helpers/uuidMapper'

export interface PurchaseRecord {
  userId: string
  product: ProductInterface
  date: string
  amount: number
  paymentMethod: string
}

export const usePaymentStore = defineStore('payment', {
  state: () => ({
    purchases: [] as PurchaseRecord[],
    lastPurchase: null as PurchaseRecord | null,
  }),
  actions: {
    addPurchase(record: Omit<PurchaseRecord, 'userId'>) {
      const authStore = useAuthStore();
      let userId = authStore.user?.id || 'anon';
      if (typeof userId === 'number') userId = getUuidForId(userId);
      const fullRecord: PurchaseRecord = { ...record, userId };
      this.purchases.push(fullRecord);
      this.lastPurchase = fullRecord;
      this.saveToLocal();
    },
    clearPurchases() {
      this.purchases = []
      this.lastPurchase = null
      this.saveToLocal();
    },
    saveToLocal() {
      localStorage.setItem('payment_purchases', JSON.stringify(this.purchases));
    },
    loadFromLocal() {
      const data = localStorage.getItem('payment_purchases');
      if (data) {
        this.purchases = JSON.parse(data);
        this.lastPurchase = this.purchases[this.purchases.length - 1] || null;
      }
    },
    async syncWithBackend() {
      try {
        await axiosAutherizedAdapter.post('/user/purchases/sync', this.purchases);
      } catch (e) {
      }
    },

    async fetchFromBackend() {
      try {
        const authStore = useAuthStore();
        let userId = authStore.user?.id;
        if (typeof userId === 'number') userId = getUuidForId(userId);
        if (!userId) return;
        const { data } = await axiosAutherizedAdapter.get(`/user/${userId}/purchases`);
        this.purchases = data as PurchaseRecord[];
        this.lastPurchase = this.purchases[this.purchases.length - 1] || null;
        this.saveToLocal();
      } catch (e) {
      }
    }
  },
  //Mostrar solo las compras del usuario autenticado
  getters: {
    userPurchases: (state) => {
      const authStore = useAuthStore()
      let userId = authStore.user?.id;
      if (typeof userId === 'number') userId = getUuidForId(userId);
      return state.purchases.filter(p => p.userId === userId)
    }
  }
})


/**Agregar una compra asociada al usuario autenticado y guardarla localmente.
Limpiar el historial de compras.
Guardar y cargar las compras desde localStorage.
Sincronizar todas las compras con el backend.
Obtener el historial de compras del usuario desde el backend y actualizar el store localmente. */
