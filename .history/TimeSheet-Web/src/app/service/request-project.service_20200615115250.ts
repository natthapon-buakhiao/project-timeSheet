import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReqInsertProject, ReqRemoveProject, ReqEditProject, RequestInquirySup } from '../shared/model/req-project';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RequestProjectService {

  constructor(private http: HttpClient) { }

  getAllProject(): Observable<any> {
    let url = 'http://localhost:8091/time-sheet/project/getdata';
    return this.http.get<any>(url, httpOptions).pipe(
      tap(_ => console.log('getAllProject success'))
    );
  }

  inquirySup(request: RequestInquirySup): Observable<any> {
    let url = 'http://localhost:8091/time-sheet/project/inquiry';
    return this.http.post<any>(url, request, httpOptions).pipe(
      tap(_ => console.log('inquiry Project success'))
    );
  }

  insetProject(request: ReqInsertProject): Observable<any> {
    let url = 'http://localhost:8091/project/insert';
    return this.http.post(url, request, httpOptions).pipe(
      tap(_ => console.log("insert Project success"))
    );
  }

  editProject(request: ReqEditProject):Observable<any>{
    let url = 'http://localhost:8091/project/edit';
    return this.http.post(url,request,httpOptions).pipe(
      tap(_ => console.log("editCustomer success"))
    )
  }

  deleteProject(request: ReqRemoveProject): Observable<any> {
    let url = 'http://localhost:8091/project/remove';
    return this.http.post(url, request, httpOptions).pipe(
      tap(_ => console.log("insert Project success"))
    );
  }

}
