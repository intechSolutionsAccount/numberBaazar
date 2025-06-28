
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";

export type VIPNumber = {
  id: number; // Changed from string to number to match Supabase schema
  mobile_number: string;
  price: number;
  discounted_price: number;
};

interface CartState {
  cart: VIPNumber[];
  addToCart: (item: VIPNumber) => void;
  removeFromCart: (id: number) => void; // Changed from string to number
  clearCart: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (item) => {
        const currentCart = get().cart;
        const exists = currentCart.find((cartItem) => cartItem.id === item.id);

        if (exists) {
          toast.info("Number is already in cart");
          return;
        }

        set({ cart: [...currentCart, item] });
        toast.success("Added to cart");
      },
      removeFromCart: (id) => {
        set({ cart: get().cart.filter((item) => item.id !== id) });
        toast.success("Removed from cart");
      },
      clearCart: () => {
        set({ cart: [] });
        toast.success("Cart cleared");
      },
    }),
    {
      name: "vip-numbers-cart",
    }
  )
);
