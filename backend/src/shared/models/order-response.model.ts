import { PaymentStatus, DeliveryStatus } from '@prisma/client';
import { ProductResponseModel } from './product-response.model';
import { UserResponseModel } from './user-response.model';
import { OrderResponseInput } from 'src/modules/order/order.type';

export class OrderResponseModel {
  public id: string;
  public created_at: Date;
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

  constructor(order: OrderResponseInput) {
    this.id = order.id;
    this.created_at = order.created_at;
    this.delivery = {
      delivery_address: order.delivery.address,
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
