/*
 * @Author: yeyu98
 * @Date: 2024-01-27 19:40:45
 * @LastEditors: xiaohu
 * @LastEditTime: 2024-02-03 14:50:21
 * @Description:
 */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/CreateUserDto';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async register(createUser: CreateUserDto) {
    const { username } = createUser;
    // 查询库里有没有这个人
    const exitUser = await this.userRepository.findOneBy({
      username,
    });
    if (exitUser) {
      throw new HttpException('用户已存在！', HttpStatus.BAD_REQUEST);
    }
    console.log(
      '✨✨🥰  ~ UserService ~ register ~ createUser--->>>',
      createUser,
    );
    const newUser = this.userRepository.create(createUser);
    console.log('✨✨🥰  ~ UserService ~ register ~ newUser--->>>', newUser);

    return await this.userRepository.save(newUser);
  }
}
