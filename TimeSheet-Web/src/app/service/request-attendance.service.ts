import { ReqInsertAttendance } from './../shared/model/requestAttendance';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

// const endpoint = environment.service.attendance.endPoint;
// const httpOptions ={
//   headers:new HttpHeaders({
//     'content-type' : 'application/json'
//   })
// }

@Injectable({
  providedIn: 'root'
})
export class RequestAttendanceService {

  constructor() {
    
  }

  // getAttendance():Observable<any>{
  //   let url = endpoint + "/inquiry";
  //   return this.http.get(url,httpOptions).pipe(
  //     tap(_ => console.log("getAttendance success"))
  //   )
  // }

  // insetAttendance(request:ReqInsertAttendance):Observable<any>{
  //   let url = endpoint + "/insert";
  //   return this.http.post(url,request,httpOptions).pipe(
  //     tap(_ => console.log("insetAttendance success"))
  //   )
  // }

}


