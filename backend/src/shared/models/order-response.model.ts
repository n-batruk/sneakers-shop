import {
  User,
  Order,
  Delivery,
  Payment,
  OrderProduct,
  Product,
  PaymentStatus,
  DeliveryStatus,
} from '@prisma/client';
import { ProductResponseModel } from './product-response.model';
import { UserResponseModel } from './user-response.model';

export class OrderResponseModel {
  public id: string;
  public delivery: {
    delivery_address: string;
    status: DeliveryStatus;
  };
  public payment: {
    amount: number;
    status: PaymentStatus;
  };
  public products: {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string | null;
    count: number;
    created_at: Date;
  }[];
  public user: UserResponseModel;

  constructor(
    order: Order & {
      delivery: Delivery;
      payment: Payment;
      products: (OrderProduct & { product: Product })[];
      user: User;
    },
  ) {
    this.id = order.id;
    this.delivery = {
      delivery_address: order.delivery.delivery_address,
      status: order.delivery.status,
    };
    this.payment = {
      amount: order.payment.amount,
      status: order.payment.status,
    };
    this.products = order.products.map((product) => ({
      ...new ProductResponseModel(product.product),
      count: product.count,
    }));
    this.user = new UserResponseModel(order.user);
  }
}
