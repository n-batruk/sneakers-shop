import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderResponseModel } from 'src/shared/models/order-response.model';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PaginateFunction, paginator } from 'src/shared/utils/paginator.util';
import { CreateOdredSeedType, OrderResponseInput } from './order.type';

const paginate: PaginateFunction = paginator({ perPage: 6 });

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAllOrders(page: string, size: string) {
    const result = await paginate<OrderResponseInput, any>(
      this.prismaService.order,
      {
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
          created_at: 'desc',
        },
      },
      {
        perPage: size,
        page,
      },
    );
    return {
      meta: result.meta,
      data: result.data.map((order) => new OrderResponseModel(order)),
    };
  }

  public async createOrder(currentUser: User, dto: CreateOrderDto) {
    const { order_products, delivery_address, payment_amount } = dto;
    return this.prismaService.order.create({
      data: {
        delivery: {
          create: {
            address: delivery_address,
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

  public async updateOrder(orderId: string, dto: UpdateOrderDto) {
    return this.prismaService.order.update({
      where: { id: orderId },
      data: {
        delivery: {
          ...(dto.delivery_status
            ? {
                update: {
                  status: dto.delivery_status,
                },
              }
            : undefined),
        },
        payment: {
          ...(dto.payment_status
            ? {
                update: {
                  status: dto.payment_status,
                },
              }
            : undefined),
        },
      },
    });
  }

  public async createOrderSeeds(dtos: CreateOdredSeedType[]) {
    const orders = await this.prismaService.order.findMany({
      where: {
        id: {
          in: dtos.map((dto) => dto.id),
        },
      },
    });
    const newDtos = dtos.filter(
      (dto) => !orders.find((order) => order.id === dto.id),
    );

    for (const dto of newDtos) {
      await this.prismaService.order.create({
        data: {
          id: dto.id,
          user_id: dto.user_id,
          created_at: dto.created_at,
          delivery: {
            create: {
              address: dto.delivery.address,
              status: dto.delivery.status,
            },
          },
          payment: {
            create: {
              amount: dto.payment.amount,
              status: dto.payment.status,
            },
          },
          products: {
            createMany: {
              data: dto.order_products,
            },
          },
        },
      });
    }
  }
}
