import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((httpEvent: HttpEvent<any>) => {
        if (httpEvent instanceof HttpResponse) {
          console.log('In HERE', httpEvent);
          if(httpEvent.headers.has('Set-Cookie')) {
            console.log(httpEvent.headers.get('Set-Cookie'));
          }
        }
      })
    );
  }
}
