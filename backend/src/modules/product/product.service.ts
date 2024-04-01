import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductResponseModel } from 'src/shared/models/product-response.model';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAllProducts() {
    const products = await this.prismaService.product.findMany();
    return products.map((product) => new ProductResponseModel(product));
  }

  public async findProductById(productId: string) {
    const product = await this.prismaService.product.findUnique({
      where: { id: productId },
    });
    return new ProductResponseModel(product);
  }

  public async createProductSeeds(dtos: CreateProductDto[]) {
    const products = await this.prismaService.product.findMany({
      where: {
        title: {
          in: dtos.map((dto) => dto.title),
        },
      },
    });
    const newDtos: CreateProductDto[] = dtos
      .filter((dto) => !products.find((product) => product.title === dto.title))
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
