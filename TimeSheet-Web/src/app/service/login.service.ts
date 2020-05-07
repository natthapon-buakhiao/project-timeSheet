import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { RequestProfile } from '../shared/model/reqLogin';


const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  }),
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public API: string = "http://localhost:8091";
  private loggedUser: string;
  allowed: any;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getProfile(request: RequestProfile): Observable<any> {
    let url = 'http://localhost:8091/iam/inquiryProfile';
    return this.http.post<any>(url, request, httpOptions).pipe(
      tap(_ => console.log('getProfile success'))
    );
  }
   login(userCode: string, password: string ): Observable<any> {
    const objLogin = {
      "isIamAdmin": "Y",
      "password": password,
      "userCode": userCode
    };
    return this.http.post<any>('http://localhost:8091/iam/login', objLogin)
      .pipe(
        tap(tokens => this.doLoginUser(userCode, tokens.accessToken)),
        mapTo(true),
        catchError(err => {
          alert('ชื่อ/รหัส ไม่ถูกต้อง');
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
