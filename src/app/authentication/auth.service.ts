import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from './auth.actions';

@Injectable()
export class AuthService {
  /**
   *
   */
  constructor(private http: HttpClient) {}

  public login(model: LoginModel): Observable<{token: string}> {
    return this.http.post<{token: string}>('/api/login', model);
  }

  public logout(token: string | null) {
    return this.http.post('/api/logout', token);
  }
}
