import { Category, CategoryRepository } from '@models/index';
import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoryFactoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  createCategory(createCategoryDto: CreateCategoryDto, user: any) {
    const category = new Category();
    category.name = createCategoryDto.name;
    category.slug = slugify(createCategoryDto.name, {
      replacement: '_',
      lower: true,
      trim: true,
    });
    category.createdBy = user._id;
    category.updatedBy = user._id;
    category.logo = createCategoryDto.logo;

    return category;
  }

  async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
    user: any,
  ) {
    const oldCategoryData = (await this.categoryRepository.getOne({
      _id: id,
    })) as Category;
    const category = new Category();
    const newName = updateCategoryDto.name || oldCategoryData.name;
    category.name = newName;
    category.slug = slugify(newName, {
      replacement: '_',
      lower: true,
      trim: true,
    });

    category.logo = updateCategoryDto.logo || oldCategoryData.logo;
    category.updatedBy = user._id;
    return category;
  }
}
