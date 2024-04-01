import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderResponseModel } from 'src/shared/models/order-response.model';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAllOrders() {
    const orders = await this.prismaService.order.findMany({
      include: {
        delivery: true,
        payment: true,
        products: {
          include: {
            product: true,
          },
        },
        user: true,
      },
      orderBy: {
        created_at: 'asc',
      },
    });
    return orders.map((order) => new OrderResponseModel(order));
  }

  public async createOrder(currentUser: User, dto: CreateOrderDto) {
    const { order_products, delivery_address, payment_amount } = dto;
    return this.prismaService.order.create({
      data: {
        delivery: {
          create: {
            delivery_address,
            status: 'INPROGRESS',
          },
        },
        payment: {
          create: {
            amount: payment_amount,
            status: 'INPROGRESS',
          },
        },
        products: {
          createMany: {
            data: order_products,
          },
        },
        user: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });
  }
}
