/*
 * @Author: yeyu98
 * @Date: 2024-01-03 22:08:39
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-01-26 20:50:25
 * @Description:
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';

const PORT = 3333;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // 设置url前缀
  app.setGlobalPrefix('api');
  // 加载过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(PORT);
  console.log(`服务启动咯~ 服务地址是：http://localhost:${PORT}`);
}
bootstrap();
