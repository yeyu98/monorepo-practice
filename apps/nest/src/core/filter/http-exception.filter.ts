/*
 * @Author: yeyu98
 * @Date: 2024-01-26 20:39:42
 * @LastEditors: xiaohu
 * @LastEditTime: 2024-02-03 14:33:42
 * @Description:
 */
import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  Catch,
} from '@nestjs/common';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const { getResponse } = host.switchToHttp(); // 获取上下文中的response对象
    const response = getResponse();
    const status = exception.getStatus(); // 获取上下文中的状态码
    const exceptionResponse: any = exception.getResponse();

    let validateMessage = '';

    if (exceptionResponse?.message) {
      validateMessage =
        typeof exceptionResponse.message === 'string'
          ? exceptionResponse.message
          : exceptionResponse.message[0];
    }

    const message = exception.message
      ? validateMessage || exception.message
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
