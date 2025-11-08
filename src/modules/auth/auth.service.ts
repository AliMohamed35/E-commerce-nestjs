import { CustomerRepository } from '@models/index';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Customer } from './entities/auth.entity';
import { sendMail } from '@common/helpers/send-mail';
import bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly configService: ConfigService,
    private readonly jwtSerice: JwtService,
  ) {}
  async register(customer: Customer) {
    const customerExist = await this.customerRepository.getOne({
      email: customer.email,
    });

    if (customerExist) {
      throw new ConflictException('user already exist');
    }

    // save into DB >> repo >> customer;
    const createdCustomer = await this.customerRepository.create(customer);

    // send-email
    sendMail({
      to: customer.email,
      subject: 'Confirm email OTP',
      html: `<h1>Your OTP is ${customer.otp}</h1>`,
    });

    const { passwrod, otp, otpExpiry, ...customerObj } = JSON.parse(
      // put the rest in var called customerObj
      JSON.stringify(createdCustomer),
    ); // deep copy

    return customerObj as Customer;
  }

  async login(loginDTO: LoginDTO) {
    const customerExist = await this.customerRepository.getOne({
      email: loginDTO.email,
    });

    const match = await bcrypt.compare(
      loginDTO.password,
      customerExist?.password || ' ',
    );

    if (!customerExist) throw new UnauthorizedException('invalid credentials');
    if (!match) {
      throw new UnauthorizedException('invalid credentials');
    }

    // generte token
    const token = this.jwtSerice.sign(
      { _id: customerExist.id, role: 'Customer', email: customerExist.email },
      { secret: this.configService.get('access').jwt_secret, expiresIn: '1d' },
    );
    return token;
  }
}
