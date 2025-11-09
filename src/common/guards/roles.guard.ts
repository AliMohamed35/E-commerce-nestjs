import { PUBLIC, ROLES, Roles } from '@common/decorators';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.get(ROLES, context.getClass());

    const publicValue = this.reflector.get(PUBLIC, context.getHandler());
    if (publicValue) return true;

    if (!roles.includes(request.user.role))
      throw new UnauthorizedException('Not allowed');
    return true;
  }
}
