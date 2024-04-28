import { BadRequestException, Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { UserDto } from './dto';
import { UsersService } from './users.service';

@Controller('v1/users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Post()
  async createUsers(@Body() user: UserDto) {
    return await this.userService.create(user);
  }

  @Delete('/:cpf')
  async deleteUsers(@Param('cpf') cpf: string) {
    if (!cpf) throw new BadRequestException('CPF is required');
    if (isNaN(Number(cpf))) throw new BadRequestException('CPF must be a number');
    if (cpf.length !== 11) throw new BadRequestException('CPF must have 11 digits');
    return await this.userService.delete(Number(cpf));
  }
}
