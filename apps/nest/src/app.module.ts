/*
 * @Author: yeyu98
 * @Date: 2024-01-03 22:08:39
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-01-24 21:02:45
 * @Description:
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';

// 应用程序的根模块，根模块提供了用来启动应用的引导机制，可以包含很多功能模块。
@Module({
  imports: [PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
