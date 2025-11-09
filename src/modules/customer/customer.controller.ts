import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { AuthGuard, RolesGuard } from '@common/guards';
import { Public, Roles } from '@common/decorators';

@Controller('customer')
@UseGuards(AuthGuard, RolesGuard)
@Roles(['Customer'])
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  @Get()
  getProfile(@Request() req: any) {
    return { message: 'done', success: true, data: { user: req.user } };
  }
}
