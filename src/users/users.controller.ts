import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserDto } from './dto';
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
      next: page
    }
  }
}
