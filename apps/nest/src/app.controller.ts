/*
 * @Author: yeyu98
 * @Date: 2024-01-03 22:08:39
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-01-23 23:25:07
 * @Description:
 */
import { Controller, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 1.固定路径：
  // get 匹配路由 http://localhost:3000/app/list
  @Get('list')
  getList(): string {
    return "I'm get list";
  }

  // post 匹配路由 http://localhost:3000/app/list
  @Post('list')
  fetchList(): string {
    return "I'm post list";
  }

  // 2.通配符路径(?+* 三种通配符 )
  // 匹配路由 * http://localhost:3000/app/user_xxx
  @Get('user_*')
  getUser(): string {
    return 'getUser';
  }

  // 3.带参数路径
  // params参数路由 匹配路由  http://localhost:3000/list/xxx
  @Put('/list/:id')
  update(): string {
    return 'update';
  }
  // 当params参数路由先定义时如果还有相同的方法以及路由会优先匹配 params参数路由已经满足了就不会往下再匹配了
  @Put('/list/user')
  updateUser() {
    return { userId: 1 };
  }

  // @Sse('stream')
  // stream() {
  //   return new Observable((observe) => {
  //     observe.next({ data: { msg: 'aaa' } });
  //     setTimeout(() => {
  //       observe.next({ data: { msg: 'bbb' } });
  //     }, 2000);
  //     setTimeout(() => {
  //       observe.next({ data: { msg: 'ccc' } });
  //     }, 5000);
  //   });
  // }
}
