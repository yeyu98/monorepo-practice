/*
 * @Author: yeyu98
 * @Date: 2024-01-03 22:08:39
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-01-03 22:13:29
 * @Description:
 */
import { Controller, Get, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Sse('stream')
  stream() {
    return new Observable((observe) => {
      observe.next({ data: { msg: 'aaa' } });
      setTimeout(() => {
        observe.next({ data: { msg: 'bbb' } });
      }, 2000);
      setTimeout(() => {
        observe.next({ data: { msg: 'ccc' } });
      }, 5000);
    });
  }
}
