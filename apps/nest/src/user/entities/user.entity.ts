/*
 * @Author: yeyu98
 * @Date: 2024-01-27 19:41:04
 * @LastEditors: xiaohu
 * @LastEditTime: 2024-02-03 14:58:48
 * @Description:
 */
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: number;
  @Column({ length: 100 })
  readonly nickname: string;

  @Column({ length: 100, unique: true })
  readonly username: string;

  @Column({ length: 100 })
  password: string;
  @Column({ default: '' })
  readonly avatar: string;
  @Column({ default: '' })
  readonly email: string;
  // 用户角色 root拥有全部权限 author拥有写文章的权限 visitor拥有阅读的权限
  @Column({ type: 'enum', enum: ['root', 'author', 'visitor'] })
  readonly role: string;
  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  readonly createTime: Date;
  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  readonly updateTime: Date;

  @BeforeInsert()
  async encryptPassword() {
    if (!this.password) return;
    console.log(
      '✨✨🥰  ~ UserEntity ~ encryptPassword ~ this.password--->>>',
      this.password,
    );
    this.password = await bcrypt.hashSync(this.password);
  }
}
