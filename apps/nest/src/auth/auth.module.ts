/*
 * @Author: xiaohu
 * @Date: 2024-02-03 15:25:19
 * @LastEditors: xiaohu
 * @LastEditTime: 2024-02-03 15:31:38
 * @FilePath: \monorepo-practice\apps\nest\src\auth\auth.module.ts
 * @Description:
 */

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService],
});

export class AuthModule {}
