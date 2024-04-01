import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JWTAuthGuard } from 'src/shared/guards/jwt.guard';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { RolesGuard } from 'src/shared/guards/roles.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Get()
  @UseGuards(RolesGuard) // checks if the user has the required roles to access
  @Roles('ADMIN')
  @UseGuards(JWTAuthGuard)
  public async getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Post()
  @UseGuards(JWTAuthGuard)
  public async createOrder(
    @CurrentUser() user: User,
    @Body() body: CreateOrderDto,
  ) {
    return this.orderService.createOrder(user, body);
  }
}
