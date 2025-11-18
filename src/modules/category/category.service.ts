import { CategoryRepository } from '@models/index';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category } from './entities/category.entity';
import { Types } from 'mongoose';
import { message } from '@common/constant';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findAll() {
    const categories = await this.categoryRepository.getAll({}, {}, {});
    return categories;
  }

  async findOne(id: number | Types.ObjectId) {
    const category = await this.categoryRepository.getOne(
      { _id: id },
      {},
      { populate: [{ path: 'createdBy' }, { path: 'updatedBy' }] },
    );

    if (!category) {
      throw new NotFoundException(message.Category.notFound);
    }
    return category;
  }

  async create(category: Category) {
    const categoryExist = await this.categoryRepository.getOne({
      slug: category.slug,
    });

    if (categoryExist) throw new ConflictException('category already exist');
    return await this.categoryRepository.create(category);
  }

  async update(id: string, category: Category) {
    const categoryExist = await this.categoryRepository.getOne({
      slug: category.slug,
      _id: { $ne: id },
    });
    if (categoryExist) throw new ConflictException('category already exist');
    return await this.categoryRepository.updateOne({ _id: id }, category, {
      new: true,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
