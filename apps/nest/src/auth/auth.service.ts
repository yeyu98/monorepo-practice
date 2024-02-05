/*
 * @Author: xiaohu
 * @Date: 2024-02-03 15:25:53
 * @LastEditors: xiaohu
 * @LastEditTime: 2024-02-05 16:35:17
 * @FilePath: \monorepo-practice\apps\nest\src\auth\auth.service.ts
 * @Description:
 */

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // 创建token
  async createToken(user: Partial<UserEntity>) {
    return await this.jwtService.sign(user);
  }

  async login(user: Partial<UserEntity>) {
    // 这里传入的options是payload也就是存储在token里的用户信息
    const token = await this.createToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });
    return { token };
  }
}
