/*
 * @Author: yeyu98
 * @Date: 2024-01-03 22:08:39
 * @LastEditors: xiaohu
 * @LastEditTime: 2024-01-25 10:40:35
 * @Description:
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 3333;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(PORT);
  console.log(`服务启动咯~ 服务地址是：http://localhost:${PORT}`);
}
bootstrap();
