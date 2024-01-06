import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dt = Date.now();

    return next.handle().pipe(
      tap(() => {
        const request = context.switchToHttp().getRequest();
        console.log('Method:', request.method); // 'GET'
        console.log('URL:', request.url); // 'http://localhost:3000/users'
        console.log('Execution time: ', Date.now() - dt, 'ms');
      }),
    );
  }
}
