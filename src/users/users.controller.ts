import { BadRequestException, Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UserDto, UserPatchDto } from './dto';
import { UsersService } from './users.service';

@Controller('v1/users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Post()
  async createUsers(@Body() user: UserDto) {
    return await this.userService.create(user);
  }
  @Patch('/:cpf')
  async updateUsers(@Body() user: UserPatchDto, @Param('cpf') cpf: string) {
    if (!cpf)
      throw new BadRequestException('cpf is required');
    if (cpf.length !== 11)
      throw new BadRequestException('cpf must have 11 characters');

    return await this.userService.update(cpf, user);
  }
}
