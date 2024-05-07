import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JWTAuthGuard } from 'src/shared/guards/jwt.guard';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Get()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @UseGuards(JWTAuthGuard)
  public async getAllOrders(
    @Query('page') page: string,
    @Query('size') size: string,
  ) {
    return this.orderService.getAllOrders(page, size);
  }

  @Post()
  @UseGuards(JWTAuthGuard)
  public async createOrder(
    @CurrentUser() user: User,
    @Body() body: CreateOrderDto,
  ) {
    return this.orderService.createOrder(user, body);
  }

  @Patch('/:orderId')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @UseGuards(JWTAuthGuard)
  public async updateOrder(
    @Param('orderId') orderId: string,
    @Body() body: UpdateOrderDto,
  ) {
    return this.orderService.updateOrder(orderId, body);
  }
}
