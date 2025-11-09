import { PUBLIC, Public } from '@common/decorators';
import { CustomerRepository } from '@models/index';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
    private readonly customerRepository: CustomerRepository,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const publicValue = this.reflector.get(PUBLIC, context.getHandler());
    if (publicValue) return true;

    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    const payload = this.jwt.verify<{
      _id: string;
      role: string;
      email: string;
    }>(authorization, {
      secret: this.configService.get('access').jwt_secret,
    });

    const customerExist = await this.customerRepository.getOne({
      _id: payload._id,
    });

    if (!customerExist) throw new NotFoundException('user not found');
    request.user = customerExist;
    return true;
  }
}
