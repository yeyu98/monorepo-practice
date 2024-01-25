/*
 * @Author: yeyu98
 * @Date: 2024-01-24 20:48:14
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-01-25 21:54:52
 * @Description:
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PostsService, PostsRo, PostQuery } from './posts.service';
import { PostsEntity } from './posts.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}
  // 创建文章
  @Post()
  async create(@Body() params: PostsEntity) {
    return await this.postService.createPost(params);
  }
  // 删除文章
  @Delete(':id')
  async remove(id: number) {
    return await this.postService.removePost(id);
  }
  // 更新文章
  @Put(':id')
  async update(id: number, post: PostsEntity) {
    return await this.postService.updatePostById(id, post);
  }
  // 查询一篇文章
  @Get(':id')
  async get(id: number) {
    return await this.postService.findPostById(id);
  }
  // 分页查询所有文章
  @Get()
  async getAll(@Query() query: PostQuery): Promise<PostsRo> {
    return await this.postService.findAllPosts(query);
  }
}
