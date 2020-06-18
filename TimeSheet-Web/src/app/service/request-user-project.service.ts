import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReqInsertUserProject, RequestInquiryProject, RequestInquiryUser } from '../shared/model/request-user-project';
import { environment } from 'src/environments/environment';

const endpoint = environment.service.userproject.endPoint;
const httpOptions = {
  headers: new HttpHeaders({
    'content-type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RequestUserProjectService {

  constructor(private http: HttpClient) { }

  inquiryUserProject(request: RequestInquiryUser): Observable<any> {
    const url = endpoint + '/inquiry-project';
    return this.http.post<any>(url, request, httpOptions).pipe(
      tap(_ => console.log('inquiry Project success'))
    );
  }

  inquiryUserProjectName(request: RequestInquiryProject): Observable<any> {
    const url = endpoint + '/inquiry-userproject';
    return this.http.post<any>(url, request, httpOptions).pipe(
      tap(_ => console.log('inquiry UserProject success'))
    );
  }

  insetUserProject(request: ReqInsertUserProject): Observable<any> {
    const url = endpoint + '/insert';
    return this.http.post(url, request, httpOptions).pipe(
      tap(_ => console.log('insert UserProject success'))
    );
  }

}
