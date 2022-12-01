import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private url: string
  public errorObject = null;
  constructor(public http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    this.url = baseUrl + "api/products";
  }

  public getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url).pipe(
      catchError(err => {
        this.errorObject = err;
        throw new Error(err);
    }));
  }
}
