import { Product, ProductRepository, productSchema } from '@models/index';
import { BrandModule } from '@modules/brand/brand.module';
import { CategoryModule } from '@modules/category/category.module';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMongoModule } from '@shared/index';
import { ProductFactoryService } from './factory/product.factory';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    UserMongoModule,
    MongooseModule.forFeature([{ name: Product.name, schema: productSchema }]),
    CategoryModule,
    BrandModule,
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductFactoryService,
    JwtService,
    ProductRepository,
  ],
})
export class ProductModule {}
