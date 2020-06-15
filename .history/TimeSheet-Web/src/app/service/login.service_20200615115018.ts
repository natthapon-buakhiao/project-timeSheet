import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, mapTo, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public API: string = "http://localhost:8091/time-sheet";
  private loggedUser: string;
  allowed: any;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

   login(userCode: string, password: string ): Observable<any> {
    const objLogin = {      
      "password": password,
      "userCode": userCode
    };
    return this.http.post<any>('http://localhost:8091/time-sheet/iam/login', objLogin)
      .pipe(
        tap(tokens => this.doLoginUser(userCode, tokens.accessToken)),
        mapTo(true),
        catchError(err => {
          // alert('ชื่อ/รหัส ไม่ถูกต้อง');
          return of(err);
        }));
  }
  private doLoginUser(username: string, tokens: string) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }
   storeTokens(tokens: String) {
    sessionStorage.setItem('accessToken', JSON.stringify(tokens));
  }
   getTokens() {
    var data = JSON.parse(sessionStorage.getItem('accessToken')); // GET localStorage key = accessToken มาดู
    return data;
  }

}
