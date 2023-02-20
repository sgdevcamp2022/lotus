import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

type lotusResponse = {
  code: number;
  message: string;
  data: any;
};
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const err = exception.getResponse() as string | lotusResponse;

    if (typeof err !== 'string') {
      return response.status(status).json({
        data: err.data,
        code: status,
        message: err.message,
      });
    }

    response.status(status).json({
      data: null,
      code: status,
      message: err,
    });
  }
}
