import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/shared/model/reqLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: Login = new Login();
  rec: Login;
  formLogin: FormGroup;
  submitted = false;
  errorMessage: String;
 
 

  constructor(
    private _login: LoginService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.createFormLogin();   
  
  }

  get f() { return this.formLogin.controls; }

  submit() {
    this.login = this.formLogin.value;
    this._login.login(this.login.userCode, this.login.password)
    .subscribe(success => {
      console.log(success);
      if (success === true) {
        this.router.navigate(['/attendance']);
        console.log('accessToken = ' + this._login.getTokens() );
      }

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
    var data = JSON.parse(sessionStorage.getItem('token')); // GET localStorage key = token มาดู
    console.log("accessToken", data.accessToken)

    // localStorage.removeItem('token'); เอาไว้ Remove Key 
    // localStorage.clear เอาไว้ Remove clear localStorage
    
  }

}
