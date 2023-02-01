import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, ObservableInput } from 'rxjs';
import { Entity } from 'src/app/core/models/base.model';

@Injectable()
export class ApiDataService {
  constructor(private http: HttpClient) {}

  public getAll(url: string): Observable<Entity[]> {
    return this.http.get<Entity[]>(url).pipe(catchError(this.handleError));
  }

  private handleError<T>(
    err: string,
    caught: Observable<T[]>
  ): ObservableInput<T[]> {
    throw new Error(err);
  }
}
