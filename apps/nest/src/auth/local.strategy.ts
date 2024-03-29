/*
 * @Author: xiaohu
 * @Date: 2024-02-03 15:35:05
 * @LastEditors: xiaohu
 * @LastEditTime: 2024-02-05 14:23:39
 * @FilePath: \monorepo-practice\apps\nest\src\auth\local.strategy.ts
 * @Description:
 */
import { Strategy } from 'passport-local';
import { PassportStrategy as _PassportStrategy } from '@nestjs/passport';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';

const PassportStrategy = _PassportStrategy(Strategy);

// 这里的策略会在哪个位置被调用呢？

export class LocalStrategy extends PassportStrategy {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super({ usernameField: 'username', passwordField: 'password' });
  }

  // 拿数据库里的用户和传入的做对比
  async validate(username: string, password: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.username=:username', { username })
      .getOne();
    if (!user) {
      throw new BadRequestException('用户名输入不正确！');
    }
    if (!compareSync(password, user.password)) {
      throw new BadRequestException('密码输入不正确！');
    }
    return user;
  }
}
