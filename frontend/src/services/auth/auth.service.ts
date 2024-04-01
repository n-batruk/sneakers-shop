import { EnhancedWithAuthHttpService } from "../main/http-auth.service";
import { HttpFactoryService } from "../main/http-factory.service";
import { HttpService } from "../main/http.service";
import { AuthRes, LoginBody, RegisterBody } from "./auth.types";

class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly httpAuthService: EnhancedWithAuthHttpService,
  ) {
    this.httpService = httpService;
  }

  private readonly module = "auth";

  public async register(body: RegisterBody): Promise<AuthRes> {
    return this.httpService.post(`${this.module}/sign-up`, body);
  }

  public async login(body: LoginBody): Promise<AuthRes> {
    return this.httpService.post(`${this.module}/sign-in`, body);
  }

  public async logOut(): Promise<string> {
    return this.httpAuthService.post(`${this.module}/log-out`, {});
  }
}

export const authService = new AuthService(
  new HttpFactoryService().createHttpService(),
  new HttpFactoryService().createAuthHttpService(),
);
