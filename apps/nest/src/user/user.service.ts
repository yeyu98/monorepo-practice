/*
 * @Author: yeyu98
 * @Date: 2024-01-27 19:40:45
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-03-02 22:45:56
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
    // 没有就创建save
    // TODO 教程里有先create一下user是为什么呢？因为使用了BeforeInsert需要先实例化一下DTO才可以生效
    // create ===> new User(createUser)
    console.log(
      '✨✨🥰  ~ UserService ~ register ~ createUser--->>>',
      createUser,
    );

    const newUser = this.userRepository.create(createUser);
    console.log('✨✨🥰  ~ UserService ~ register ~ newUser--->>>', newUser);
    return await this.userRepository.save(createUser);
  }
}
