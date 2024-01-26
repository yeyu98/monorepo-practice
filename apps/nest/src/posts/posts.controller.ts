/*
 * @Author: yeyu98
 * @Date: 2024-01-24 20:48:14
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-01-26 20:30:33
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
  Param,
} from '@nestjs/common';
import { PostsService, PostsRo, PostQuery } from './posts.service';
import { PostsEntity } from './posts.entity';

/* 
@Param @Query 
方法一致，标识入参是路径上传入的param，如果传入对应的key 就可以获取指定key对应的value 否则返回对象；
*/
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
  async remove(@Param('id') id: number) {
    return await this.postService.removePost(id);
  }
  // 更新文章
  @Put(':id')
  async update(@Param('id') id: number, @Body() post: PostsEntity) {
    return await this.postService.updatePostById(id, post);
  }
  // 查询一篇文章
  @Get(':id')
  async get(@Param('id') id: number) {
    return await this.postService.findPostById(id);
  }
  // 分页查询所有文章
  @Get()
  async getAll(@Query() query: PostQuery): Promise<PostsRo> {
    console.log('✨✨🥰  ~ PostsController ~ getAll ~ query--->>>', query);
    return await this.postService.findAllPosts(query);
  }
}
