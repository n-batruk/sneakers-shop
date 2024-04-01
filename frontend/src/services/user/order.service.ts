import { EnhancedWithAuthHttpService } from "../main/http-auth.service";
import { HttpFactoryService } from "../main/http-factory.service";
import { User } from "@/types/user.type";

class UserService {
  constructor(private readonly httpAuthService: EnhancedWithAuthHttpService) {
    this.httpAuthService = httpAuthService;
  }

  private readonly module = "user";

  public async getAllUsers(): Promise<User[]> {
    return this.httpAuthService.get(`${this.module}`);
  }
}

export const userService = new UserService(
  new HttpFactoryService().createAuthHttpService(),
);
