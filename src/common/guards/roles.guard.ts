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
    const publicValue = this.reflector.get(PUBLIC, context.getHandler());

    if (publicValue) return true;
    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.getAllAndMerge(ROLES, [
      context.getClass(),
      context.getHandler(),
    ]);

    if (!roles.includes(request.user.role))
      throw new UnauthorizedException('Not allowed');
    return true;
  }
}
