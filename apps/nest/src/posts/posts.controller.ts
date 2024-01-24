/*
 * @Author: yeyu98
 * @Date: 2024-01-24 20:48:14
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-01-24 20:56:03
 * @Description:
 */
import { Controller, Get } from '@nestjs/common';

@Controller('posts')
export class PostsController {
  @Get('/posts')
  getPosts() {
    return '123';
  }
}
