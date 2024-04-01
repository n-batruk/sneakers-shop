import { Product } from "./product.type";
import { User } from "./user.type";
export const PaymentStatus = {
  ACCEPTED: "ACCEPTED",
  INPROGRESS: "INPROGRESS",
  REJECTED: "REJECTED",
} as const;
export type PaymentStatusType =
  (typeof PaymentStatus)[keyof typeof PaymentStatus];

export const DeliveryStatus = {
  DELIVERED: "DELIVERED",
  INPROGRESS: "INPROGRESS",
} as const;
export type DeliveryStatusType =
  (typeof DeliveryStatus)[keyof typeof DeliveryStatus];
export type Order = {
  id: string;
  user: User;
  products: {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string | null;
    count: number;
    created_at: Date;
  }[];
  payment: {
    amount: number;
    status: PaymentStatusType;
  };
  delivery: {
    delivery_address: string;
    status: DeliveryStatusType;
  };
};
