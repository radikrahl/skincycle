import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { BaseEntity } from '../models/base.model';
import { Product } from '../models/product.model';

@Injectable()
export abstract class ApiService<T> {
  protected url: string;
  public errorObject = null;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.url = baseUrl;
  }
  public httpGet<T>(url: string): Observable<T> {
    return this.http.get<T>(url).pipe(
      catchError((err) => {
        this.errorObject = err;
        throw new Error(err);
      })
    );
  }
  public abstract getAll(): Observable<T[]>
}
