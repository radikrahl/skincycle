import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';
import { ApiService } from './api.service';

@Injectable()
export class CategoriesService extends ApiService<Category> {
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl + 'api/categories');
  }

  public getAll(): Observable<Category[]> {
    return super.httpGet<Category[]>(this.url);
  }
}
