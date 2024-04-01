import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWTService } from '../../modules/jwt/jwt.service';
import type { Request } from 'express';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import type { AuthRequest } from '../../modules/auth/auth.types';
import { PrismaService } from 'nestjs-prisma';
import { SHARED_ROUTES } from 'src/modules/auth/auth.constants';

@Injectable()
export class JWTAuthGuard implements CanActivate {
  private readonly jwtPublicKey: string;
  private readonly configService: ConfigService;
  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService,
    @Inject(JWTService) private readonly jwtService: JWTService,
  ) {
    this.configService = new ConfigService();
    this.jwtPublicKey = this.configService
      .getOrThrow('JWT_PUBLIC_KEY')
      .replace(/\\n/g, '\n');
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: AuthRequest = context.switchToHttp().getRequest();

    const isValid = await this.validateRequest(request);

    if (request.url === `/${SHARED_ROUTES.MODULE}/${SHARED_ROUTES.CHECK}`) {
      request.auth = isValid;
      return true;
    }

    return isValid;
  }

  private async validateRequest(request: AuthRequest): Promise<boolean> {
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const isValid = this.jwtService.validateJWTToken(
        token,
        this.jwtPublicKey,
      );
      if (!isValid) {
        throw new UnauthorizedException();
      }
      const payload = this.jwtService.decodeJWTToken(token);

      const user = await this.prismaService.user.findUnique({
        where: {
          id: payload.sub,
        },
      });
      if (user?.jwt !== token) {
        throw new UnauthorizedException();
      }

      request.user = user;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
