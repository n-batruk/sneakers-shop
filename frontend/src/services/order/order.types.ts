import { OrderProduct } from "@/types/order-product.type";
import { DeliveryStatusType, PaymentStatusType } from "@/types/order.type";

export type CreateOdrderBody = {
  delivery_address: string;
  payment_amount: number;
  order_products: Pick<OrderProduct, "count" | "price" | "product_id">[];
};

export type UpdateOdrderBody = {
  delivery_status: DeliveryStatusType;
  payment_status: PaymentStatusType;
};
