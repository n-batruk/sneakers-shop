import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { JWTAuthGuard } from 'src/shared/guards/jwt.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  public async getAllProducts(
    @Query('page') page: string,
    @Query('size') size: string,
  ) {
    return this.productService.getAllProducts(page, size);
  }

  @Get('/:productId')
  public async findProductById(@Param('productId') productId: string) {
    return this.productService.findProductById(productId);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @UseGuards(JWTAuthGuard)
  public async createProduct(@Body() body: CreateProductDto) {
    return this.productService.createProduct(body);
  }

  @Patch('/:productId')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @UseGuards(JWTAuthGuard)
  public async updateProduct(
    @Param('productId') productId: string,
    @Body() body: UpdateProductDto,
  ) {
    return this.productService.updateProduct(productId, body);
  }

  @Delete('/:productId')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @UseGuards(JWTAuthGuard)
  public async deleteProduct(@Param('productId') productId: string) {
    return this.productService.deleteProduct(productId);
  }
}
