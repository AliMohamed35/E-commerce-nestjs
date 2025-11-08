import { generateOTP } from '@common/helpers';
import { RegisterDTO } from '../dto';
import { Customer } from '../entities/auth.entity';
import bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthFactoryService {
  async createCustomer(registerDTO: RegisterDTO) {
    const customer = new Customer();
    customer.email = registerDTO.email;
    customer.userName = registerDTO.userName;
    customer.password = await bcrypt.hash(registerDTO.password, 10);
    customer.dob = registerDTO.dob;
    customer.otp = generateOTP();
    customer.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    customer.isVerified = false;

    return customer;
  }
}
