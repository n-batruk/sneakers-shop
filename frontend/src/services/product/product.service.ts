import { Product } from "@/types/product.type";
import { HttpFactoryService } from "../main/http-factory.service";
import { HttpService } from "../main/http.service";

class ProductService {
  constructor(private readonly httpService: HttpService) {
    this.httpService = httpService;
  }

  private readonly module = "product";

  public async getAllProducts(): Promise<Product[]> {
    return this.httpService.get(`${this.module}/`);
  }

  public async findProductById(productId: string): Promise<Product> {
    return this.httpService.get(`${this.module}/${productId}`);
  }
}

export const productService = new ProductService(
  new HttpFactoryService().createHttpService(),
);
