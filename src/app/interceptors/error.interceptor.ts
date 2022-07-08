import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor,} from '@angular/common/http';
import {delay, Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {CoreService} from '@services/core';
import {MessageService} from '@services/core';

@Injectable()

export class ErrorInterceptor implements HttpInterceptor {
  constructor(private coreService: CoreService, private messageService: MessageService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.coreService.showLoad();
    return next.handle(request).pipe(
      delay(1000),
      tap((response) => {
        this.coreService.hideLoad();
      }),
      catchError(error => {
        // this.appService.dismissLoading();
        this.coreService.hideLoad();
        console.log(error);
        this.messageService.error(error.error);
        return throwError(error);
      }));
  }
}
