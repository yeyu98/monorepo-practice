import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// 定义文章用于创建表
// @Entity：标识当前类是一个实体；
// @Column：定义列的数据类型；
// @PrimaryGeneratedColumn 设置某一列为主键并自动生成，有几种生成id的方式increment（自增）、uuid（随机生成唯一标识）、rowid、identity；

@Entity('posts')
export class PostsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number; // 标记id为主键

  @Column({ length: 50 })
  title: string;

  @Column({ length: 20 })
  author: string;

  @Column('text') // 字符串 0 ~ 65535
  content: string;

  @Column({ default: '' })
  thumb_url: string;

  @Column('tinyint') // 数字 0 ~ 255
  type: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_time: Date;
}
