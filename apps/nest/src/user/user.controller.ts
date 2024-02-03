/*
 * @Author: yeyu98
 * @Date: 2024-01-27 19:40:37
 * @LastEditors: xiaohu
 * @LastEditTime: 2024-02-03 15:15:10
 * @Description:
 */
import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: '注册用户' })
  @Post('register')
  async register(@Body() createUser: CreateUserDto) {
    return await this.userService.register(createUser);
  }
}
