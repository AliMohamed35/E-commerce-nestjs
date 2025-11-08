import { Module, ValidationPipe } from '@nestjs/common';
import { UserMongoModule } from '@shared/index';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { APP_PIPE } from '@nestjs/core';
import { AuthFactoryService } from './factory';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserMongoModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthFactoryService,
    JwtService,
    // { provide: APP_PIPE, useClass: ValidationPipe }
  ],
})
export class AuthModule {}
