import { Brand, BrandRepository } from '@models/index';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { message } from '@common/constant';
import { Types } from 'mongoose';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepository: BrandRepository) {}

  async create(brand: Brand) {
    const brandExist = await this.brandRepository.getOne({ slug: brand.slug });
    if (brandExist) throw new ConflictException(message.Brand.alreadyExist);

    return await this.brandRepository.create(brand);
  }

  findAll() {
    return `This action returns all brand`;
  }

  async findOne(id: number | Types.ObjectId | string) {
    const brandExist = await this.brandRepository.getOne({ _id: id });

    if (!brandExist) throw new NotFoundException(message.Brand.notFound);

    return brandExist;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
