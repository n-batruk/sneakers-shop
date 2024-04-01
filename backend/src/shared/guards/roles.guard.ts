import { ForbiddenException, Injectable } from '@nestjs/common';

import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from '@prisma/client';
import { AuthRequest } from 'src/modules/auth/auth.types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: AuthRequest = context.switchToHttp().getRequest();

    const requireRoles = this.reflector.get<UserRoles[]>(
      'roles',
      context.getHandler(),
    );

    if (!requireRoles) return true;

    if (!request.user) {
      return false;
    }

    if (requireRoles.includes(request.user.role)) {
      return true;
    } else {
      throw new ForbiddenException('You do not have access');
    }
  }
}
