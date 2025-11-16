import { AbstractRepository } from '@models/abstract.repository';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';

@Injectable()
export class UserRepository extends AbstractRepository<User> {
  constructor(@InjectModel(User.name) userModel: Model<User>) {
    super(userModel);
  }
}
