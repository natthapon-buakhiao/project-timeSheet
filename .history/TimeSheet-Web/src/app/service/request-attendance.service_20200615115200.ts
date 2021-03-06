import { ReqInsertAttendance, RequestInquiryAttendace } from './../shared/model/requestAttendance';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

// const endpoint = environment.service.attendance.endPoint;
const httpOptions ={
  headers:new HttpHeaders({
    'content-type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class RequestAttendanceService {

  constructor(private http: HttpClient) {
    
  }

  insetAttendance(request:ReqInsertAttendance):Observable<any>{
    let url = 'http://localhost:8091/time-sheet/attendance/insert';
    return this.http.post(url,request,httpOptions).pipe(
      tap(_ => console.log("insetAttendance success"))
    )
  }

  inquiryAttendance(request: RequestInquiryAttendace): Observable<any> {
    let url = 'http://localhost:8091/time-sheet/attendance/inquiry';
    return this.http.post<any>(url, request, httpOptions).pipe(
      tap(_ => console.log('getAttendance success'))
    );
  }

  getAllSite(): Observable<any> {
    let url = 'http://localhost:8091/time-sheet/site/getdata';
    return this.http.get<any>(url, httpOptions).pipe(
      tap(_ => console.log('getAll Site success'))
    );
  }

}


