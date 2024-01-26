/*
 * @Author: yeyu98
 * @Date: 2024-01-24 20:46:12
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-01-26 19:54:30
 * @Description:
 */
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsEntity } from './posts.entity';

// TypeOrmModule.forFeature 可以理解成注册指定的实体成对应的表
@Module({
  imports: [TypeOrmModule.forFeature([PostsEntity])], // 所以是不是除了nest自带的msc都算外部模块，外部模块需要先导入才能在其他的msc里使用？
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
