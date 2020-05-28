import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login, ReqProfile } from 'src/app/shared/model/reqLogin';
import { RequestProfileService } from 'src/app/service/request-profile.service';
import { ReqUserProfile } from 'src/app/shared/model/req-user-profile';
import { UserProfileService } from 'src/app/service/user-profile.service';

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
  createProfile: FormGroup;
  setToken: any;
  dataProfile: any;
 
 

  constructor(
    private _login: LoginService,
    private fb: FormBuilder,
    private router: Router,
    private reqProfileService: RequestProfileService,
    private userProfileService: UserProfileService,
    private _FormBuild: FormBuilder
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
        this.router.navigate(['/']);
        // this.router.navigateByUrl("/");
        console.log('accessToken = ' + this._login.getTokens() );
        this.getUserProfile();
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

  getUserProfile() {
    let request = new ReqProfile();
    this.setToken = JSON.parse(sessionStorage.getItem('accessToken'));
    request.token = this.setToken;
    console.log(request);

    this.reqProfileService.getProfile(request).subscribe((res)  => {
      this.dataProfile = res;
      console.log( this.dataProfile);
      sessionStorage.setItem('userProfileIam', JSON.stringify(this.dataProfile));
      this.setFromProfile(this.dataProfile);
    }, (error) => {
      console.log(error);
     });
    }

    setFromProfile(dataProfile) {
      this.createProfile = this._FormBuild.group({
        userCode: [dataProfile.userCode,Validators.required],
        firstName: [dataProfile.localFirstName,Validators.required],
        lastName: [dataProfile.localLastName,Validators.required],
        position: [dataProfile.position,Validators.required],
        birthday: [null,Validators.required],
        age: [null,Validators.required],
        address: [null,Validators.required],
        site: [dataProfile.department,Validators.required]
      });
      console.log( this.createProfile);
      this.onSaveUserProfile();

    }

    onSaveUserProfile() {
      let request = new ReqUserProfile();
      request.userCode = this.createProfile.controls['userCode'].value;
      request.firstName = this.createProfile.controls['firstName'].value;
      request.lastName = this.createProfile.controls['lastName'].value;
      request.birthday = this.createProfile.controls['birthday'].value;
      request.age = this.createProfile.controls['age'].value;
      request.address = this.createProfile.controls['address'].value;
      request.position = this.createProfile.controls['position'].value;
      request.site = this.createProfile.controls['site'].value;
      this.userProfileService.insertProfile(request).subscribe((res) => {
        console.log("edit UserProfile Success");
        console.log(res);
      },
        (error) => {
          console.log(error);
        });
    }

  showAccessToken(){
    var data = JSON.parse(sessionStorage.getItem('token'));
    console.log("accessToken", data.accessToken)    
  }

}
