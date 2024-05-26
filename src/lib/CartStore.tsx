import create from "zustand";

type CartItem = {
  productId: string;
  quantity: number;
  price: number;
  productName: string;
};

type CartState = {
  cart: CartItem[];
  addToCart: (productId: string, productName: string, price: number) => void;
  removeFromCart: (
    productId: string,
    productName: string,
    price: number
  ) => void;
};

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (productId, productName, price) =>
    set((state) => {
      const existingItem = state.cart.find(
        (item) => item.productId === productId
      );
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.productId === productId
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
        (item) => item.productId === productId
      );
      if (existingItem && existingItem.quantity > 1) {
        return {
          cart: state.cart.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      }
      return {
        cart: state.cart.filter((item) => item.productId !== productId),
      };
    }),
}));

export default useCartStore;
