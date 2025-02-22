import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserPayloadDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly user: UserService) {}

  @Get(':userId')
  async getUser(@Param('userId') userId: string) {
    return await this.user.getUserById(userId);
  }

  @Post()
  async createUser(@Body() payload: CreateUserPayloadDto) {
    return await this.user.createUser(payload.name);
  }
}
