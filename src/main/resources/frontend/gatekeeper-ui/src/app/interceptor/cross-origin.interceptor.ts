import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CrossOriginInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // const modifiedReq = request.clone({
    //   headers: request.headers.set('Access-Control-Allow-Origin', '*')
    //     .set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    //     .set('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    // });
    return next.handle(request);
  }
}
