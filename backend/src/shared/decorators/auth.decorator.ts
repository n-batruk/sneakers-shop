import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { AuthRequest } from 'src/modules/auth/auth.types';

export const Auth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: AuthRequest = ctx.switchToHttp().getRequest();
    return request.auth;
  },
);
