import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { BaseEntity } from '../models/base.model';

export abstract class BaseDataService {
  abstract getAll(): Observable<BaseEntity[]>;
  protected abstract baseUrl: string;

  protected abstract httpGet(url: string) : Observable<BaseEntity>;
}

@Injectable()
export class ApiService<T extends BaseEntity> extends BaseDataService {
  public errorObject = null;
  constructor(private http: HttpClient, @Inject('BASE_URL') protected baseUrl: string) {
    super();
  }
  protected override httpGet(url: string): Observable<T[]> {
    return this.http.get<T[]>(url).pipe(
      catchError((err) => {
        this.errorObject = err;
        throw new Error(err);
      })
    );
  }
  public getAll(): Observable<T[]> {
    return this.httpGet(this.baseUrl);
  }
}
