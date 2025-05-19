import { Catch, ArgumentsHost, HttpException, HttpStatus, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    
    const status = 
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
        
    const message = 
      exception instanceof HttpException
        ? exception.message
        : 'Error interno del servidor';
    
    console.error('Excepción no controlada:', exception);
    
    response
      .status(status)
      .json({
        success: false,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        message,
      });
  }
}