/*
 * @Author: yeyu98
 * @Date: 2024-01-24 20:51:02
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-01-25 21:54:43
 * @Description:
 */
import { HttpException, Injectable } from '@nestjs/common';
import { PostsEntity } from './posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
export interface PostsRo {
  list: PostsEntity[];
  count: number;
}
export interface PostQuery {
  pageSize: number;
  pageNum: number;
}
// HttpException抛出异常和Error有什么区别
// PostsRo的作用是什么？
// InjectRepository是个参数装饰器，具体的作用是什么
// typeorm 提供了两种查询方式 一种是通过api查询另外一个是通过createQueryBuilder创建查询
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: Repository<PostsEntity>,
  ) {}

  // 创建文章 并返回创建的数据
  async createPost(post: Partial<PostsEntity>): Promise<PostsEntity> {
    const { title } = post;
    if (!title) {
      throw new HttpException('缺少文章标题', 401);
    }
    const doc = this.postsRepository.findOneBy({ title });
    if (doc) {
      throw new HttpException('文章已存在', 401);
    }
    return await this.postsRepository.save(post);
  }
  // 删除文章
  async removePost(id: number) {
    const doc = await this.postsRepository.findOneBy({ id });
    if (!doc) {
      throw new HttpException('文章不存在', 401);
    }
    return await this.postsRepository.remove(doc);
  }
  // 更新文章
  async updatePostById(id: number, post: PostsEntity) {
    const existPost = await this.postsRepository.findOneBy({ id });
    if (!existPost) {
      throw new HttpException('文章不存在', 401);
    }
    const updatePost = await this.postsRepository.merge(existPost, post);
    return this.postsRepository.save(updatePost);
  }
  // 查询一篇文章
  async findPostById(id: number) {
    return await this.postsRepository.findOneBy({ id });
  }
  // 查询文章列表（分页） pageSize pageNum
  async findAllPosts(query: PostQuery): Promise<PostsRo> {
    const qb = await this.postsRepository.createQueryBuilder('post');
    qb.where('1 = 1');
    qb.orderBy('post.create_time', 'DESC');
    const count = await qb.getCount();
    const { pageSize = 10, pageNum = 1 } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));
    const list = await qb.getMany();
    return { list, count };
  }
}
