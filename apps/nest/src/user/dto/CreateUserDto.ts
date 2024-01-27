/*
 * @Author: yeyu98
 * @Date: 2024-01-27 21:05:13
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-01-27 21:24:51
 * @Description:
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly username: string;
  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
  @ApiPropertyOptional({ description: '昵称' })
  readonly nickname: string;
  @ApiPropertyOptional({ description: '头像' })
  readonly avatar: string;
  @ApiPropertyOptional({ description: '邮箱' })
  readonly email: string;
}
