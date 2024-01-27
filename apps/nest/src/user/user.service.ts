/*
 * @Author: yeyu98
 * @Date: 2024-01-27 19:40:45
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-01-27 21:16:15
 * @Description:
 */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/CreateUserDto';
@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository) {}
  async register(createUser: CreateUserDto) {
    const { username } = createUser;
    // 查询库里有没有这个人
    const exitUser = this.userRepository.findOneBy({
      username,
    });
    if (exitUser) {
      throw new HttpException('用户已存在！', HttpStatus.BAD_REQUEST);
    }
    // 没有就创建save
    // TODO 教程里有先create一下user，但我觉得可能不需要先创建，因为传进来的本身就是一个对象
    // create ===> new User(createUser)
    return await this.userRepository.save(createUser);
  }
}
