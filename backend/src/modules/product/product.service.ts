import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductResponseModel } from 'src/shared/models/product-response.model';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductSeedType } from './product.type';
import {
  PaginateFunction,
  PaginatedResult,
  paginator,
} from 'src/shared/utils/paginator.util';
import { Product } from '@prisma/client';

const paginate: PaginateFunction = paginator({ perPage: 6 });

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAllProducts(
    page: string,
    size: string,
  ): Promise<PaginatedResult<ProductResponseModel>> {
    const result = await paginate<Product, any>(
      this.prismaService.product,
      {
        orderBy: {
          updated_at: 'desc',
        },
      },
      {
        page,
        perPage: size,
      },
    );
    return {
      meta: result.meta,
      data: result.data.map((product) => new ProductResponseModel(product)),
    };
  }

  public async findProductById(productId: string) {
    const product = await this.prismaService.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return new ProductResponseModel(product);
  }

  public async createProduct(dto: CreateProductDto) {
    return this.prismaService.product.create({
      data: dto,
    });
  }

  public async updateProduct(productId: string, dto: UpdateProductDto) {
    return this.prismaService.product.update({
      data: dto,
      where: {
        id: productId,
      },
    });
  }

  public async deleteProduct(productId: string) {
    return this.prismaService.product.delete({
      where: {
        id: productId,
      },
    });
  }

  public async createProductSeeds(dtos: CreateProductSeedType[]) {
    const products = await this.prismaService.product.findMany({
      where: {
        id: {
          in: dtos.map((dto) => dto.id),
        },
      },
    });
    const newDtos: CreateProductDto[] = dtos
      .filter((dto) => !products.find((product) => product.id === dto.id))
      .map((dto) => ({
        ...dto,
        title: dto.title.trim().slice(0, 50),
        description: dto.description.trim().slice(0, 255),
      }));
    return this.prismaService.product.createMany({
      data: newDtos,
    });
  }
}
