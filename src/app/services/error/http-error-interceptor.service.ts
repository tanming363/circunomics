import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorHandlerService } from './error-handler.service';

@Injectable()
export class HttpErrorInterceptorService implements HttpInterceptor {
  constructor(private errorHandlerService: ErrorHandlerService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '.';

        if (error.status === 404) {
          errorMessage =
            'The resource you are looking for could not be found 4☹4';
          this.errorHandlerService.setError(error);
        } else if (error.status === 500) {
          errorMessage =
            'Something went wrong on the server. Please try again later.';
          this.errorHandlerService.setError(errorMessage);
        } else if (error.status === 403) {
          errorMessage = 'You are not authorized to access this resource.';
          this.errorHandlerService.setError(errorMessage);
        }

        this.errorHandlerService.setError(error.message);

        return throwError(() => errorMessage);
      })
    );
  }
}
