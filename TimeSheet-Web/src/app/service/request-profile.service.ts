import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReqProfile } from '../shared/model/reqLogin';
import { environment } from 'src/environments/environment';

const endpoint = environment.service.profileIam.endPoint;
const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  }),
};


@Injectable({
  providedIn: 'root'
})
export class RequestProfileService {

  constructor(
    private http: HttpClient,
  ) { }


  getProfileIAM(request: ReqProfile): Observable<any> {
    let url = endpoint + "/inquiryProfile";
    return this.http.post<any>(url, request, httpOptions).pipe(
      tap(_ => console.log('getProfile success'))
    );
  }
  
}
