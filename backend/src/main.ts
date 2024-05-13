import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserService } from './modules/user/user.service';
import { ProductService } from './modules/product/product.service';
import { OrderService } from './modules/order/order.service';
import { UserSeeds } from './modules/user/user.seed';
import { ProductSeeds } from './modules/product/product.seed';
import { OrderSeeds } from './modules/order/order.seed';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: ['http://127.0.0.1:5173', 'http://localhost:8080', '*'],
  });

  const userService = app.get(UserService);
  const productService = app.get(ProductService);
  const orderService = app.get(OrderService);

  await userService.createSeedUsers(UserSeeds);
  await productService.createProductSeeds(ProductSeeds);
  await orderService.createOrderSeeds(OrderSeeds);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
