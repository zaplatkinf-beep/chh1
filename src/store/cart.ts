import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../data/menu';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedSizePrice?: number;
  upsells: { id: string; name: string; price: number }[];
}

interface CartStore {
  items: CartItem[];
  promoCode: string | null;
  promoDiscount: number;
  isCartOpen: boolean;
  addItem: (product: Product, size?: string, sizePrice?: number, upsells?: { id: string; name: string; price: number }[]) => void;
  removeItem: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  setPromoCode: (code: string | null, discount: number) => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  getTotal: () => number;
  getItemCount: () => number;
  getDeliveryCost: () => number;
}

const getItemKey = (productId: string, size?: string) => `${productId}_${size || 'default'}`;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      promoDiscount: 0,
      isCartOpen: false,

      addItem: (product, size, sizePrice, upsells = []) => {
        set((state) => {
          const key = getItemKey(product.id, size);
          const existingIndex = state.items.findIndex(
            (item) => getItemKey(item.product.id, item.selectedSize) === key
          );

          if (existingIndex >= 0) {
            const newItems = [...state.items];
            newItems[existingIndex] = {
              ...newItems[existingIndex],
              quantity: newItems[existingIndex].quantity + 1,
            };
            return { items: newItems };
          }

          return {
            items: [
              ...state.items,
              {
                product,
                quantity: 1,
                selectedSize: size,
                selectedSizePrice: sizePrice,
                upsells,
              },
            ],
          };
        });
      },

      removeItem: (productId, size) => {
        set((state) => {
          const key = getItemKey(productId, size);
          return {
            items: state.items.filter(
              (item) => getItemKey(item.product.id, item.selectedSize) !== key
            ),
          };
        });
      },

      updateQuantity: (productId, quantity, size) => {
        if (quantity <= 0) {
          get().removeItem(productId, size);
          return;
        }
        set((state) => {
          const key = getItemKey(productId, size);
          return {
            items: state.items.map((item) =>
              getItemKey(item.product.id, item.selectedSize) === key
                ? { ...item, quantity }
                : item
            ),
          };
        });
      },

      clearCart: () => set({ items: [], promoCode: null, promoDiscount: 0 }),

      setPromoCode: (code, discount) => set({ promoCode: code, promoDiscount: discount }),

      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      setCartOpen: (open) => set({ isCartOpen: open }),

      getTotal: () => {
        const state = get();
        const subtotal = state.items.reduce((sum, item) => {
          const itemPrice = item.selectedSizePrice || item.product.price;
          const upsellTotal = item.upsells.reduce((s, u) => s + u.price, 0);
          return sum + (itemPrice + upsellTotal) * item.quantity;
        }, 0);
        const discount = subtotal * (state.promoDiscount / 100);
        return Math.round(subtotal - discount);
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getDeliveryCost: () => {
        const total = get().getTotal();
        if (total >= 300) return 0;
        if (total > 0) return 150;
        return 0;
      },
    }),
    {
      name: 'syr-syr-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
