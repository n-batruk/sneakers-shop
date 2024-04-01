import { OrderProduct } from "@/types/order-product.type";

export type CreateOdrderBody = {
  delivery_address: string;
  payment_amount: number;
  order_products: Pick<OrderProduct, "count" | "price" | "product_id">[];
};
