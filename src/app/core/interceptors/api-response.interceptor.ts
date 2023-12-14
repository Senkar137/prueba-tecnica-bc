import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/api-response';

@Injectable()
export class ApiResponseInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map(response => {
        if (response instanceof HttpResponse) {
          const apiResponse: ApiResponse<any> = {
            errorMessage: null,
            statusCode: response.status,
            data: response.body,
          };
          return response.clone({ body: apiResponse });
        }
        return response;
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          const apiResponse: ApiResponse<any> = {
            errorMessage: error.error,
            statusCode: error.status,
            data: null,
          };

          return throwError(apiResponse);
        }

        return throwError(error);
      })
    );
  }
}
