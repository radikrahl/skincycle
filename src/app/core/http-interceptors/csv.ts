import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CsvInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const baseUrl = '../assets/data/';
    req.url.split('/');
    const array1 = req.url.split('/');
    const last_element = array1[array1.length - 1];
    req = req.clone({
      url: baseUrl + last_element + '.csv',
      responseType: 'text',
    });
    return next.handle(req);
  }
}
