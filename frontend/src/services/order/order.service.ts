import { Order } from "@/types/order.type";
import { EnhancedWithAuthHttpService } from "../main/http-auth.service";
import { HttpFactoryService } from "../main/http-factory.service";
import { CreateOdrderBody } from "./order.types";

class OrderService {
  constructor(private readonly httpAuthService: EnhancedWithAuthHttpService) {
    this.httpAuthService = httpAuthService;
  }

  private readonly module = "order";

  public async getAllOrders(): Promise<Order[]> {
    return this.httpAuthService.get(`${this.module}`);
  }

  public async createOrder(body: CreateOdrderBody): Promise<any> {
    return this.httpAuthService.post(`${this.module}`, body);
  }
}

export const orderService = new OrderService(
  new HttpFactoryService().createAuthHttpService(),
);
