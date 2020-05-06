import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public API: string = "http://localhost:8091";
  allowed: any;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {    

  }

  submit(userCode: any,password: any): Observable<any>{
    const objLogin = {
      "isIamAdmin": "Y",
      "password": password,
      "userCode": userCode
    };
    
    // return this.http.get(this.API + '/Login/' + userCode + '/' + password);
    return  this.http.post('https://localhost:8091/attendance/reqAttendance', objLogin);
  }

}




export class Login{
    userId?:any;
    userCode?: string;
    password?: string;
    isLogin?: boolean;
    // isIamAdmin?:"Y";
}