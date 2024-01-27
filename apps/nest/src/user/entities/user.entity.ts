/*
 * @Author: yeyu98
 * @Date: 2024-01-27 19:41:04
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-01-27 21:11:06
 * @Description:
 */
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import bcrypt from 'bcryptjs';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: number;
  @Column({ length: 100 })
  readonly nickname: string;

  @Column({ length: 100, unique: true })
  readonly username: string;

  password: string;
  readonly avatar: string;
  readonly email: string;
  // 用户角色 root拥有全部权限 author拥有写文章的权限 visitor拥有阅读的权限
  @Column({ type: 'enum', enum: ['root', 'author', 'visitor'] })
  readonly role: string;
  @Column({
    name: 'create_time',
    type: 'date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  readonly createTime: Date;
  @Column({
    name: 'update_time',
    type: 'date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  readonly updateTime: Date;

  @BeforeInsert()
  async encryptPassword() {
    this.password = await bcrypt.hashSync(this.password);
  }
}
