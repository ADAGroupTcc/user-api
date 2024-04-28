import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/users.schema';
import { UserDto, UserPatchDto } from './dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

  async create(user: UserDto): Promise<User> {
    if (!user.nickname) {
      user.nickname = `${user.firstName} ${user.lastName}`
    }
    const createdUser = new this.userModel(user);
    try {
      const userCreated = await createdUser.save();
      return userCreated
    } catch (err: any) {
      if (err.code === 11000)
        throw new BadRequestException(err.message)
      else
        throw new InternalServerErrorException(err.message)
    }
  }

  async list(cpf: string, limit: number, page: number): Promise<User[]> {
    if (cpf) {
      return await this.userModel.find({ cpf }).exec()
    }
    return await this.userModel.find().limit(limit).skip(limit * (page - 1)).exec()
  }

  async update(cpf: string, user: UserPatchDto): Promise<User> {
    const userUpdated = await this.userModel.findOneAndUpdate({ cpf: cpf }, user, { new: true })
    if (!userUpdated)
      throw new NotFoundException('User not found')
    return userUpdated
  }

  async delete(cpf: number): Promise<User> {
    const userDeleted = await this.userModel.findOneAndDelete({ cpf });
    if (!userDeleted)
      throw new BadRequestException('User not found')
    return userDeleted
  }
}
