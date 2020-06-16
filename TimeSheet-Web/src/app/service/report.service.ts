import { RequestInsertReport, RequestInquiryReport } from './../shared/model/report';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const endpoint = environment.service.report.endPoint;
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

  inquiryReport(request: RequestInquiryReport): Observable<any> {
    let url = endpoint + "/list-staff";
    return this.http.post<any>(url, request, httpOptions).pipe(
      tap(_ => console.log('Inquiry Report success'))
    );
  }

}
