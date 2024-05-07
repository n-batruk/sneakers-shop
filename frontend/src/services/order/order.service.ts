import { Order } from "@/types/order.type";
import { EnhancedWithAuthHttpService } from "../main/http-auth.service";
import { HttpFactoryService } from "../main/http-factory.service";
import { CreateOdrderBody, UpdateOdrderBody } from "./order.types";
import { PaginatedResult } from "@/types/pagination.type";

class OrderService {
  constructor(private readonly httpAuthService: EnhancedWithAuthHttpService) {
    this.httpAuthService = httpAuthService;
  }

  private readonly module = "order";

  public async getAllOrders(
    page: number,
    size: number,
  ): Promise<PaginatedResult<Order>> {
    return this.httpAuthService.get(`${this.module}`, {
      params: {
        page,
        size,
      },
    });
  }

  public async createOrder(body: CreateOdrderBody): Promise<any> {
    return this.httpAuthService.post(`${this.module}`, body);
  }

  public async updateOrder(
    body: UpdateOdrderBody,
    orderId: string,
  ): Promise<any> {
    return this.httpAuthService.patch(`${this.module}/${orderId}`, body);
  }
}

export const orderService = new OrderService(
  new HttpFactoryService().createAuthHttpService(),
);
