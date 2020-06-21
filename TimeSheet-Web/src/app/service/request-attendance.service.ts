import { ReqInsertAttendance, RequestInquiryAttendace, ReqEditAttendance, ReqRemoveAttendance } from './../shared/model/requestAttendance';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const endpoint = environment.service.attendance.endPoint;
const endpoint2 = environment.service.site.endPoint;
const httpOptions = {
  headers: new HttpHeaders({
    'content-type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RequestAttendanceService {

  constructor(private http: HttpClient) {

  }

  insetAttendance(request: ReqInsertAttendance): Observable<any> {
    const url = endpoint + '/insert';
    return this.http.post(url, request, httpOptions).pipe(
      tap(_ => console.log('insetAttendance success'))
    );
  }

  editAttendance(request: ReqEditAttendance): Observable<any> {
    const url = endpoint + '/edit';
    return this.http.post(url, request, httpOptions).pipe(
      tap(_ => console.log('EditAttendance success'))
    );
  }

  removeAttendance(request: ReqRemoveAttendance): Observable<any> {
    const url = endpoint + '/remove';
    return this.http.post(url, request, httpOptions).pipe(
      tap(_ => console.log('RemoveAttendance success'))
    );
  }

  inquiryAttendance(request: RequestInquiryAttendace): Observable<any> {
    const url = endpoint + '/inquiry';
    return this.http.post<any>(url, request, httpOptions).pipe(
      tap(_ => console.log('getAttendance success'))
    );
  }

  getAllSite(): Observable<any> {
    const url = endpoint2 + '/getdata';
    return this.http.get<any>(url, httpOptions).pipe(
      tap(_ => console.log('getAll Site success'))
    );
  }

}


