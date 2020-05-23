import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReqInsertProject } from '../shared/model/req-project';

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
    let url = 'http://localhost:8091/project/getdata';
    return this.http.get<any>(url, httpOptions).pipe(
      tap(_ => console.log('getAllProject success'))
    );
  }

  insetProject(request: ReqInsertProject): Observable<any> {
    let url = 'http://localhost:8091/project/insert';
    return this.http.post(url, request, httpOptions).pipe(
      tap(_ => console.log("insert Project success"))
    );
  }

}
