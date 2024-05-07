import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { JwtModule } from '../jwt/jwt.module';

@Module({
  imports: [JwtModule],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
