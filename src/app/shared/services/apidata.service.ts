import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ɵInjectableAnimationEngine } from '@angular/platform-browser/animations';
import { Observable, catchError, ObservableInput } from 'rxjs';
import { Entity } from 'src/app/core/models/base.model';
import { Category } from 'src/app/shared/categories/models/category.model';

interface DataService<T> {
  getAll(url: string) : Observable<T[]>;
}

@Injectable()
export class ApiDataService<T> implements DataService<T> {
  constructor(protected http: HttpClient) {}

  public getAll(url: string): Observable<T[]> {
    return this.http.get<T[]>(url).pipe(catchError(this.handleError));
  }

  private handleError(
    err: string,
    caught: Observable<T[]>
  ): ObservableInput<T[]> {
    throw new Error(err);
  }
}
