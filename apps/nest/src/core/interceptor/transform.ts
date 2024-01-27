/*
 * @Author: yeyu98
 * @Date: 2024-01-26 21:00:55
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-01-27 17:30:46
 * @Description:
 */
import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, map } from 'rxjs';
// 这里的map怎么使用？map：可以修改输入的值，再输出。类似于JS的map函数；
// 这里的Observable 又是个啥？异步流集合（不是很懂
// 这里的next.handle().pipe 又分别是啥？？
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('✨✨🥰  ~ HttpExceptionFilter ~ errorResponse--->>> 拦截器');
    return next.handle().pipe(
      map((data) => ({
        data,
        code: 0,
        message: '请求成功',
      })),
    );
  }
}
