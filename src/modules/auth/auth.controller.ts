import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto';
import { AuthFactoryService } from './factory';
import { LoginDTO } from './dto/login.dto';
import { success } from 'zod';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authFactoryService: AuthFactoryService,
  ) {}

  @Post('/register')
  async register(@Body() registerDTO: RegisterDTO) {
    const customer = await this.authFactoryService.createCustomer(registerDTO);
    const registeredCustomer = await this.authService.register(customer);

    return {
      message: 'Customer created successfully',
      success: true,
      data: registeredCustomer,
    };
  }

  @Post('/login')
  async login(@Body() loginDTO: LoginDTO) {
    const token = await this.authService.login(loginDTO);
    return {
      message: 'user logged in successfully',
      success: true,
      data: token,
    };
  }
}
