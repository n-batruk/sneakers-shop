import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JWTService } from '../jwt/jwt.service';
import { UserResponseModel } from 'src/shared/models/user-response.model';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from '@prisma/client';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JWTService,
  ) {}

  private async setUserJwt(userId: string): Promise<string> {
    const jwt = this.jwtService.generateJWTToken(userId);
    const user = await this.userService.changeJwtByUserId(userId, jwt);
    return user.jwt as string;
  }

  public async signUp(props: SignUpDto) {
    await this.userService.checkIsEmailAlreadyInUse(props.email.toLowerCase());
    const user = await this.userService.createClientUser(props);

    const token = await this.setUserJwt(user.id);

    return {
      user: new UserResponseModel(user),
      jwt: token,
    };
  }

  public async signIn(body: SignInDto) {
    const user = await this.userService.validateUser(
      body.email.toLowerCase(),
      body.password,
    );
    const token = await this.setUserJwt(user?.id);
    return {
      user: new UserResponseModel(user),
      jwt: token,
    };
  }

  public async logOut(currentUser: User) {
    return this.userService.changeJwtByUserId(currentUser.id, null);
  }
}
