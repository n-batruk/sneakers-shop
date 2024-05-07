import { CreateProduct, Product, UpdateProduct } from "@/types/product.type";
import { HttpFactoryService } from "../main/http-factory.service";
import { HttpService } from "../main/http.service";
import { PaginatedResult } from "@/types/pagination.type";
import { EnhancedWithAuthHttpService } from "../main/http-auth.service";

class ProductService {
  constructor(
    private readonly httpService: HttpService,
    private readonly httpAuthService: EnhancedWithAuthHttpService,
  ) {
    this.httpAuthService = httpAuthService;

    this.httpService = httpService;
  }

  private readonly module = "product";

  public async getAllProducts(
    page: number,
    size: number,
  ): Promise<PaginatedResult<Product>> {
    return this.httpService.get(`${this.module}/`, {
      params: {
        page,
        size,
      },
    });
  }

  public async findProductById(productId: string): Promise<Product> {
    return this.httpService.get(`${this.module}/${productId}`);
  }

  public async createProduct(body: CreateProduct): Promise<Product> {
    return this.httpAuthService.post(`${this.module}/`, body);
  }

  public async updateProduct(
    productId: string,
    body: UpdateProduct,
  ): Promise<Product> {
    return this.httpAuthService.patch(`${this.module}/${productId}`, body);
  }

  public async deleteProduct(productId: string): Promise<Product> {
    return this.httpAuthService.delete(`${this.module}/${productId}`);
  }
}

export const productService = new ProductService(
  new HttpFactoryService().createHttpService(),
  new HttpFactoryService().createAuthHttpService(),
);
