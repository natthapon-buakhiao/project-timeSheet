import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: Login = new Login();
  rec: Login;
  formLogin: FormGroup;
 
 

  constructor(
    private _login: LoginService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.createFormLogin();
    if(localStorage.length > 0){ // Check localStorage มีข้อมูลไหม
      this.showAccessToken();
    }
  
  }

  submit(){
    this.login = this.formLogin.value;
    this._login.submit(this.login.userCode, this.login.password).subscribe((res) => {
      this.rec = res;
      console.log(res);
      // this._login.login(this.rec.userId);
      localStorage.setItem('token',JSON.stringify(res)); // SAVE res ไว้ใน key = token
      this.router.navigate(['/attendance']);     
    }, er => {
      console.log("testssssError!!")
      // this.notification.error();
    });
  }

  createFormLogin(){
    this.formLogin = this.fb.group({
      userCode: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  showAccessToken(){
    var data = JSON.parse(localStorage.getItem('token')); // GET localStorage key = token มาดู
    console.log("accessToken", data.accessToken)

    // localStorage.removeItem('token'); เอาไว้ Remove Key 
    // localStorage.clear เอาไว้ Remove clear localStorage
    
  }

}
