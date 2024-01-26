/*
 * @Author: yeyu98
 * @Date: 2024-01-26 20:39:42
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-01-26 20:47:28
 * @Description:
 */
import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const { getResponse } = host.switchToHttp(); // 获取上下文中的response对象
    const response = getResponse();
    const status = exception.getStatus(); // 获取上下文中的状态码

    const message = exception.message
      ? exception.message
      : `${status >= 500 ? 'Service Error' : 'Client Error'}`;

    const errorResponse = {
      data: {},
      message,
      code: -1,
    };

    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
