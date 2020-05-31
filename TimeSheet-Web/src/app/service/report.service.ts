import { RequestInsertReport, RequestInquiryReport } from './../shared/model/report';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const httpOptions ={
  headers:new HttpHeaders({
    'content-type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private http: HttpClient
  ) { }

  insetReport(request:RequestInsertReport):Observable<any>{
    let url = 'http://localhost:8091/report/insert';
    return this.http.post(url,request,httpOptions).pipe(
      tap(_ => console.log("insetReport success"))
    )
  }

  inquiryReport(request: RequestInquiryReport): Observable<any> {
    let url = 'http://localhost:8091/report/inquiry';
    return this.http.post<any>(url, request, httpOptions).pipe(
      tap(_ => console.log('Inquiry Report success'))
    );
  }

}
