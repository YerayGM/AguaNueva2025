import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const now = new Date();
    return next.handle().pipe(
      map((data: T) => {
        // Para respuestas de éxito estándar
        return {
          success: true,
          data,
          timestamp: now.toISOString(),
        };
      })
    );
  }
}