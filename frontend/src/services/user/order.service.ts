import { PaginatedResult } from "@/types/pagination.type";
import { EnhancedWithAuthHttpService } from "../main/http-auth.service";
import { HttpFactoryService } from "../main/http-factory.service";
import { User } from "@/types/user.type";

class UserService {
  constructor(private readonly httpAuthService: EnhancedWithAuthHttpService) {
    this.httpAuthService = httpAuthService;
  }

  private readonly module = "user";

  public async getAllUsers(
    page: number,
    size: number,
  ): Promise<PaginatedResult<User>> {
    return this.httpAuthService.get(`${this.module}`, {
      params: {
        page,
        size,
      },
    });
  }
}

export const userService = new UserService(
  new HttpFactoryService().createAuthHttpService(),
);
