import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from 'src/modules/auth/auth.types';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: AuthRequest = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
