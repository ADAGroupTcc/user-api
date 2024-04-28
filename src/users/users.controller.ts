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
  async listUsers(@Query('cpf') cpf: string, @Query('limit') limit: number, @Query('next') next: number) {
    if (cpf && isNaN(Number(cpf))) throw new BadRequestException('CPF must be a number');
    if (cpf && cpf.length !== 11) throw new BadRequestException('CPF must have 11 digits');
    if (!limit || limit < 1 || isNaN(Number(limit))) {
      limit = 10;
    }
    if (!next || next < 1 || isNaN(Number(next))) {
      next = 1;
    }
    var users = await this.userService.list(cpf, limit, next);
    return {
      users,
      next: users.length == 0 || users.length < limit ? 0 : Number(next) + 1,
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
