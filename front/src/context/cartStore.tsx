import { create } from "zustand";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating?: number;
  description: string;
  quantity: number;
};

type CartState = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void; // Ajout de la méthode clearCart
};

const useCartStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (product) => set((state) => {
    const existingProduct = state.cart.find((p) => p.id === product.id);
    if (existingProduct) {
      // Incrémente la quantité si le produit existe déjà dans le panier
      return { cart: state.cart.map((p) => 
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      )};
    } else {
      // Ajoute un nouveau produit au panier avec quantité 1
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }
  }),
  removeFromCart: (id) =>
    set((state) => ({ cart: state.cart.filter((p) => p.id !== id) })),
  clearCart: () => set({ cart: [] }), // Ajout de la méthode clearCart
}));

export default useCartStore;
