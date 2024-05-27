
import create from "zustand";

type CartItem = {
  productId: string;
  quantity: number;
  price: number;
  productName: string;
};

type CartState = {
  cart: CartItem[];
  addToCart: (productId: number, productName: string, price: number) => void;
  removeFromCart: (
    productId: number,
    productName: string,
    price: number
  ) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set) => {
  return {
    cart: [],
    addToCart: (productId, productName, price) =>
      set((state: any) => {
        const existingItem = state.cart.find(
          (item: CartItem) => parseInt(item.productId) === productId
        );
        if (existingItem) {
          return {
            cart: state.cart.map((item: CartItem) =>
              parseInt(item.productId) === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        }
        return {
          cart: [...state.cart, { productId, price, productName, quantity: 1 }],
        };
      }),
    removeFromCart: (productId) =>
      set((state) => {
        const existingItem = state.cart.find(
          (item) => parseInt(item.productId) === productId
        );
        if (existingItem && existingItem.quantity > 1) {
          return {
            cart: state.cart.map((item) =>
              parseInt(item.productId) === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          };
        }
        return {
          cart: state.cart.filter(
            (item) => parseInt(item.productId) !== productId
          ),
        };
      }),
    clearCart: () => {
      set(() => ({
        cart: [],
      }));
      return;
    },
  };
});

export default useCartStore;
