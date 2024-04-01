import { Module, OnModuleInit } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductSeeds } from './product.seed';

@Module({
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule implements OnModuleInit {
  constructor(private readonly productService: ProductService) {}

  public async onModuleInit() {
    await this.productService.createProductSeeds(ProductSeeds);
  }
}
