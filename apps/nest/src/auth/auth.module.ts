/*
 * @Author: xiaohu
 * @Date: 2024-02-03 15:25:19
 * @LastEditors: xiaohu
 * @LastEditTime: 2024-02-05 10:19:53
 * @FilePath: \monorepo-practice\apps\nest\src\auth\auth.module.ts
 * @Description:
 */

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
