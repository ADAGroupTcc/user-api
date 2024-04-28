import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common';
import { UserDto, UserPatchDto } from './dto';
import { UsersService } from './users.service';

@Controller('v1/users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Post()
  async createUsers(@Body() user: UserDto) {
    return await this.userService.create(user);
  }

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
      next: users.length <= limit ? 0 : page + 1,
    }
  }

  @Patch('/:cpf')
  async updateUsers(@Body() user: UserPatchDto, @Param('cpf') cpf: string) {
    if (!cpf) throw new BadRequestException('CPF is required');
    if (isNaN(Number(cpf))) throw new BadRequestException('CPF must be a number');
    if (cpf.length !== 11) throw new BadRequestException('CPF must have 11 digits');

    return await this.userService.update(cpf, user);
  }

  @Delete('/:cpf')
  @HttpCode(204)
  async deleteUsers(@Param('cpf') cpf: string) {
    if (!cpf) throw new BadRequestException('CPF is required');
    if (isNaN(Number(cpf))) throw new BadRequestException('CPF must be a number');
    if (cpf.length !== 11) throw new BadRequestException('CPF must have 11 digits');
    return await this.userService.delete(Number(cpf));
  }
}
