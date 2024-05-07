import {
  Delivery,
  Order,
  OrderProduct,
  Payment,
  Product,
  User,
} from '@prisma/client';

export type OrderResponseInput = Order & {
  delivery: Delivery;
  payment: Payment;
  products: (OrderProduct & { product: Product })[];
  user: User;
};

export type CreateOdredSeedType = Order & {
  delivery: Omit<Delivery, 'id' | 'created_at' | 'updated_at' | 'order_id'>;
  payment: Omit<Payment, 'id' | 'created_at' | 'updated_at' | 'order_id'>;
  order_products: Omit<
    OrderProduct,
    'id' | 'created_at' | 'updated_at' | 'order_id'
  >[];
};
