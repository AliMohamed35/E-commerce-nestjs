import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Admin,
  AdminRepository,
  adminSchema,
  Customer,
  CustomerRepository,
  customerSchema,
  Seller,
  SellerRepository,
  sellerSchema,
  User,
  UserRepository,
  userSchema,
} from 'src/models';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema,
        discriminators: [
          { name: Seller.name, schema: sellerSchema },
          { name: Customer.name, schema: customerSchema },
          { name: Admin.name, schema: adminSchema },
        ],
      },
    ]),
  ],
  controllers: [],
  providers: [
    SellerRepository,
    CustomerRepository,
    AdminRepository,
    UserRepository,
  ],
  exports: [
    SellerRepository,
    CustomerRepository,
    AdminRepository,
    UserRepository,
  ], // export repositories for use in other modules
})
export class UserMongoModule {}
