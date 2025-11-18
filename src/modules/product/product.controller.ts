import { Auth, User } from '@common/decorators';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { ProductFactoryService } from './factory/product.factory';
import { message } from '@common/constant';

@Controller('product')
@Auth(['Admin', 'Seller'])
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productFactoryService: ProductFactoryService,
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto, @User() user: any) {
    const product = this.productFactoryService.createProduct(
      createProductDto,
      user,
    );

    const createdProduct = await this.productService.create(product);

    return {
      message: message.Product.created,
      success: true,
      data: createdProduct,
    };
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
