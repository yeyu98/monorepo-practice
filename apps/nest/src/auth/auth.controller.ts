/*
 * @Author: xiaohu
 * @Date: 2024-02-03 15:25:31
 * @LastEditors: xiaohu
 * @LastEditTime: 2024-02-05 16:35:42
 * @FilePath: \monorepo-practice\apps\nest\src\auth\auth.controller.ts
 * @Description:
 */
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('验证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 这个守卫的作用是啥？用来在执行controller之前调用local strategy的
  @UseGuards(AuthGuard('local'))
  // 这个拦截器的作用又是啥？用来过滤password字段的
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() user: LoginDto, @Req() req) {
    return await this.authService.login(req.user);
  }
}
