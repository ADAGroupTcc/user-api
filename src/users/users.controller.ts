<<<<<<< Updated upstream
import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from './dto';
=======
import { BadRequestException, Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UserDto, UserPatchDto } from './dto';
>>>>>>> Stashed changes
import { UsersService } from './users.service';

@Controller('v1/users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Post()
  async createUsers(@Body() user: UserDto) {
    return await this.userService.create(user);
  }
<<<<<<< Updated upstream
=======

  @Get()
  async listUsers(@Query('cpf') cpf: string, @Query('limit') limit: number, @Query('page') page: number) {
    if (!limit) {
      limit = 10;
    }
    if (!page) {
      page = 1;
    }
    var users = await this.userService.list(cpf, limit, page);
    return {
      users,
      next: page
    }
  }

  @Patch('/:cpf')
  async updateUsers(@Body() user: UserPatchDto, @Param('cpf') cpf: string) {
    if (!cpf)
      throw new BadRequestException('cpf is required');
    if (cpf.length !== 11)
      throw new BadRequestException('cpf must have 11 characters');

    return await this.userService.update(cpf, user);
  }
>>>>>>> Stashed changes
}
