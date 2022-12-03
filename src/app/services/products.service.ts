import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { Product } from '../models/product.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends ApiService<Product> {
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl + 'api/products');
  }

  public getAll(): Observable<Product[]> {
    return super.httpGet<Product[]>(this.url).pipe(
      tap((products) => {
        products.map((product) => {
          product.price = (product.price as number).toLocaleString('de-DE', {
            style: 'currency',
            currency: 'EUR',
          });
        });
      })
    );
  }
}
