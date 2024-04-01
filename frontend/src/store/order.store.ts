import { OrderProduct } from "@/types/order-product.type";
import { Product } from "@/types/product.type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUserState {
  paymentAmount: number;
  orderProducts: OrderProduct[];
  setOrderProducts: (products: Product[]) => void;

  addOrderProduct: (productId: string) => void;
  removeOrderProduct: (productId: string) => void;

  clearOrderProducts: () => void;
}

export const useOrderStore = create(
  persist<IUserState>(
    (set) => ({
      paymentAmount: 0,
      orderProducts: [],
      setOrderProducts: (products: Product[]): void => {
        set(() => ({
          orderProducts: products.map((product) => ({
            title: product.title,
            image: product.image,
            count: 0,
            price: product.price,
            product_id: product.id,
          })),
        }));
      },

      addOrderProduct: (productId: string): void => {
        set((state) => {
          const orderProduct = state.orderProducts.find(
            (orderProduct) => orderProduct.product_id === productId,
          );
          if (!orderProduct) {
            return {
              paymentAmount: state.paymentAmount,
              orderProducts: state.orderProducts,
            };
          }
          const paymentAmount =
            Math.round((state.paymentAmount + orderProduct.price) * 100) / 100;
          const orderProducts = state.orderProducts.map((op) =>
            op.product_id === productId ? { ...op, count: op.count + 1 } : op,
          );
          return {
            paymentAmount,
            orderProducts,
          };
        });
      },

      removeOrderProduct: (productId: string): void => {
        set((state) => {
          const orderProduct = state.orderProducts.find(
            (orderProduct) => orderProduct.product_id === productId,
          );
          if (!orderProduct || !orderProduct.count) {
            return {
              paymentAmount: state.paymentAmount,
              orderProducts: state.orderProducts,
            };
          }
          const paymentAmount =
            Math.round((state.paymentAmount - orderProduct.price) * 100) / 100;
          const orderProducts = state.orderProducts.map((op) =>
            op.product_id === productId ? { ...op, count: op.count - 1 } : op,
          );
          return {
            paymentAmount,
            orderProducts,
          };
        });
      },
      clearOrderProducts: (): void => {
        set((state) => ({
          paymentAmount: 0,
          orderProducts: state.orderProducts.map((op) => ({
            ...op,
            count: 0,
          })),
        }));
      },
    }),
    {
      name: "order-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
