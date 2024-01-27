/*
 * @Author: yeyu98
 * @Date: 2024-01-24 20:48:14
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-01-27 22:07:30
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
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PostsService, PostsRo, PostQuery } from './posts.service';
import { PostsEntity } from './entities/posts.entity';
import { CreatePostsDto } from './dto/posts.dto';

/* 
@Param @Query 
方法一致，标识入参是路径上传入的param，如果传入对应的key 就可以获取指定key对应的value 否则返回对象；
*/
@ApiTags('文章')
@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @ApiOperation({ summary: '创建文章', description: '文章创建的api' })
  @Post()
  async create(@Body() params: CreatePostsDto) {
    return await this.postService.createPost(params);
  }

  @ApiOperation({ summary: '删除文章' })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.postService.removePost(id);
  }

  @ApiOperation({ summary: '更新文章' })
  @Put(':id')
  async update(@Param('id') id: number, @Body() post: PostsEntity) {
    return await this.postService.updatePostById(id, post);
  }

  @ApiOperation({ summary: '查询一篇文章' })
  @Get(':id')
  async get(@Param('id') id: number) {
    return await this.postService.findPostById(id);
  }

  @ApiOperation({ summary: '分页查询所有文章' })
  @Get()
  async getAll(@Query() query: PostQuery): Promise<PostsRo> {
    console.log('✨✨🥰  ~ PostsController ~ getAll ~ query--->>>', query);
    return await this.postService.findAllPosts(query);
  }
}
