/*
 * @Author: yeyu98
 * @Date: 2024-01-27 19:40:25
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-01-27 21:03:07
 * @Description:
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
