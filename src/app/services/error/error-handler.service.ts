import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  private errorSubject: Subject<string> = new Subject<string>();
  error$ = this.errorSubject.asObservable();

  setError(errorMessage: any): void {
    this.errorSubject.next(errorMessage);
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    this.setError(error);
    return throwError(() => error);
  }
}
