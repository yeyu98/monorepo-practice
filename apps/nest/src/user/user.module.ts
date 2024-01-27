/*
 * @Author: yeyu98
 * @Date: 2024-01-27 19:40:25
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-01-27 19:46:04
 * @Description:
 */
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
