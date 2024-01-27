import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import bcrypt from 'bcryptjs';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: number;
  @Column({ length: 100 })
  readonly nickname: string;

  @Column({ length: 100 })
  readonly username: string;

  password: string;
  readonly avatar: string;
  readonly email: string;

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
