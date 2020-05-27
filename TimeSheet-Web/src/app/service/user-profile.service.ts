import { tap } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { RequestInquiryProfile, ReqEditUserProfile, ReqInsertUserProfile } from '../shared/model/req-user-profile';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';


const httpOptions = {
  headers: new HttpHeaders({
    'content-type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) { }

  getAllUserProfile(): Observable<any> {
    let url = 'http://localhost:8091/profile/getdata';
    return this.http.get<any>(url, httpOptions).pipe(
      tap(_ => console.log('getAllUser success'))
    );
  }

  inquiryUserProfile(request: RequestInquiryProfile): Observable<any> {
    let url = 'http://localhost:8091/profile/inquiry';
    return this.http.post<any>(url, request, httpOptions).pipe(
      tap(_ => console.log('inquiryUserProfile success'))
    );
  }

  insertProfile(request: ReqInsertUserProfile): Observable<any> {
    let url = 'http://localhost:8091/profile/insert';
    return this.http.post(url, request, httpOptions).pipe(
      tap(_ => console.log("insetUserPrpfile success"))
    );
  }

  editProfile(request: ReqEditUserProfile): Observable<any> {
    let url = 'http://localhost:8091/profile/edit';
    return this.http.post(url, request, httpOptions).pipe(
      tap(_ => console.log("editUserPrpfile success"))
    );
  }
}
