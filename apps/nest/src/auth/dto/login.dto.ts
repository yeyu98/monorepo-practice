/*
 * @Author: xiaohu
 * @Date: 2024-02-03 16:14:28
 * @LastEditors: xiaohu
 * @LastEditTime: 2024-02-05 09:21:29
 * @FilePath: \monorepo-practice\apps\nest\src\auth\dto\login.dto.ts
 * @Description:
 */

import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: '用户名不允许为空' })
  username: string;
  @IsNotEmpty({ message: '密码不允许为空' })
  password: string;
}
