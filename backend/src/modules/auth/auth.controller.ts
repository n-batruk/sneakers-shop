import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SHARED_ROUTES } from './auth.constants';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { JWTAuthGuard } from 'src/shared/guards/jwt.guard';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Controller(SHARED_ROUTES.MODULE)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get(SHARED_ROUTES.CHECK)
  @UseGuards(JWTAuthGuard) // checks if the request is authenticated
  public async checkIsAuth(@Auth() auth: boolean) {
    return auth;
  }

  @Post('sign-in')
  public async signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }

  @Post('sign-up')
  public async signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @Post('log-out')
  @UseGuards(JWTAuthGuard)
  public async logOut(@CurrentUser() user: User) {
    return this.authService.logOut(user);
  }
}
