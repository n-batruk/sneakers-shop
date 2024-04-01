import { Product } from "@/types/product.type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IProductState {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

export const useProductStore = create(
  persist<IProductState>(
    (set) => ({
      products: [],
      setProducts: (products: Product[]): void => {
        set(() => ({ products }));
      },
    }),
    {
      name: "order-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
