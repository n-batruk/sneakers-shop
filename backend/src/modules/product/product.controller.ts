import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  public async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get('/:productId')
  public async findProductById(@Param('productId') productId: string) {
    return this.productService.findProductById(productId);
  }
}
