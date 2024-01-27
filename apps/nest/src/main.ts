/*
 * @Author: yeyu98
 * @Date: 2024-01-03 22:08:39
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-01-27 22:16:09
 * @Description:
 */
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform';
import { ValidationPipe } from '@nestjs/common';

const PORT = 3333;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // 设置url前缀
  app.setGlobalPrefix('api');
  // 加载过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 加载拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 加载管道
  app.useGlobalPipes(new ValidationPipe());

  // swagger文档配置
  const config = new DocumentBuilder()
    .setTitle('文章平台')
    .setDescription('文章平台接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT);
  console.log(
    `服务启动咯~ 服务地址是：http://localhost:${PORT}\n接口文档地址是：http://localhost:${PORT}/docs`,
  );
}
bootstrap();
