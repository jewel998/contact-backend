import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply as Response } from 'fastify';
import { ValidationError } from 'src/pipes/validation.pipe';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof ValidationError
        ? HttpStatus.BAD_REQUEST
        : exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

    const error =
      exception instanceof HttpException
        ? exception.name
        : exception instanceof Error
          ? exception.name
          : 'Unknown exception';
    const message =
      exception instanceof HttpException
        ? exception.message
        : exception instanceof Error
          ? exception.message
          : 'Unknown exception';

    response
      .headers({ 'Content-Type': 'applicaiton/json' })
      .status(status)
      .send(
        JSON.stringify({
          success: false,
          data: null,
          error,
          message,
          statusCode: status,
          validation:
            exception instanceof ValidationError ? exception.error : undefined,
          timestamp: new Date().toISOString(),
        }),
      );
  }
}
