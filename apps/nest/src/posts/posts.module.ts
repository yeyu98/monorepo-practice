/*
 * @Author: yeyu98
 * @Date: 2024-01-24 20:46:12
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-01-24 20:46:54
 * @Description:
 */
import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
