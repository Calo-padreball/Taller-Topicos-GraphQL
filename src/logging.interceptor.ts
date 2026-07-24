import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('GraphQL-AOP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = GqlExecutionContext.create(context);
    const info = ctx.getInfo(); 
    
    const nombreOperacion = info ? info.fieldName : 'Operacion General';
    
    const tiempoInicio = Date.now();

    return next
      .handle()
      .pipe(
        tap(() => {
          const tiempoTotal = Date.now() - tiempoInicio;
          this.logger.log(`Operación ejecutada: [${nombreOperacion}] - Tiempo de respuesta: ${tiempoTotal}ms`);
        }),
      );
  }
}