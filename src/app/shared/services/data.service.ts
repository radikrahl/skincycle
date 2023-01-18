import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, ObservableInput } from 'rxjs';
import { Entity } from 'src/app/models/base.model';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  public getAll(url: string): Observable<Entity[]> {
    return this.http.get<Entity[]>(url).pipe(catchError(this.handleError));
  }

  private handleError<T>(
    err: any,
    caught: Observable<T[]>
  ): ObservableInput<any> {
    throw new Error(err);
  }
}
