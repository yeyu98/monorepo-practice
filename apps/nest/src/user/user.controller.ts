/*
 * @Author: yeyu98
 * @Date: 2024-01-27 19:40:37
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-01-27 21:22:42
 * @Description:
 */
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('注册用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('register')
  register(@Body() createUser: CreateUserDto) {
    this.userService.register(createUser);
  }
}
