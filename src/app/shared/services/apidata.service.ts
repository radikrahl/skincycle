import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, ObservableInput } from 'rxjs';

interface DataService<T> {
  getAll(url: string): Observable<T[]>;
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
    console.error(err);
    return caught;
  }
}
