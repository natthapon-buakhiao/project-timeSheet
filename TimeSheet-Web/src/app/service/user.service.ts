import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../shared/model/user';
import { RequestInquiryUser } from '../shared/model/request-user-project';
import { environment } from 'src/environments/environment';

const endpoint = environment.service.user.endPoint;
const httpOptions = {
  headers: new HttpHeaders({
    'content-type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUser(): Observable<any> {
    let url = endpoint + "/getdata";
    return this.http.get<any>(url, httpOptions).pipe(
      tap(_ => console.log('getAllUser success'))
    );
  }


  insertUser(request: User): Observable<any> {
    let url = endpoint + "/insert";
    return this.http.post(url, request, httpOptions).pipe(
      tap(_ => console.log("insertUser success"))
    );
  }

  inquiryUser(request: RequestInquiryUser): Observable<any> {
    let url = endpoint + "/inquiry";
    return this.http.post<any>(url, request, httpOptions).pipe(
      tap(_ => console.log('inquiryUser success'))
    );
  }


}
