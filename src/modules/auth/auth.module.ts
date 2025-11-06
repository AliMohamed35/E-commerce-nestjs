import { Module } from '@nestjs/common';
import { UserMongoModule } from '@shared/index';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserMongoModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    // ,
    // { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AuthModule {}
