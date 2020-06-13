import { UserProfileService } from './../../service/user-profile.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login, ReqProfile } from 'src/app/shared/model/reqLogin';
import { RequestProfileService } from 'src/app/service/request-profile.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/shared/model/user';
import { ReqInsertUserProfile } from 'src/app/shared/model/req-user-profile';

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
  createUser: FormGroup;
  setToken: any;
  dataProfile: any;
  createProfile: FormGroup;
 
 

  constructor(
    private _login: LoginService,
    private fb: FormBuilder,
    private router: Router,
    private reqProfileService: RequestProfileService,    
    private _FormBuild: FormBuilder,
    private userService: UserService,
    private userProfileService: UserProfileService

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
        this.getUser();
        // console.log('accessToken = ' + this._login.getTokens());
        
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

  getUser() {
    let request = new ReqProfile();
    this.setToken = JSON.parse(sessionStorage.getItem('accessToken'));
    request.token = this.setToken;
    // console.log(request);

    this.reqProfileService.getProfileIAM(request).subscribe((res)  => {
      this.dataProfile = res;
      // console.log( this.dataProfile);
      sessionStorage.setItem('userProfileIam', JSON.stringify(this.dataProfile));
      this.router.navigate(['/']);
      this.setFromUser(this.dataProfile);
      this.setFromUserProfile(this.dataProfile)
    }, (error) => {
      console.log(error);
     });
    }

    setFromUser(dataUser) {
      this.createUser = this._FormBuild.group({
        userCode: [dataUser.userCode,Validators.required],
        lineManager:[dataUser.lineManager.userCode]
      });
      // console.log( this.createUser);
      this.onSaveUser();

    }

    setFromUserProfile(dataUser) {
      this.createProfile = this._FormBuild.group({
        userCode: [dataUser.userCode,Validators.required],          
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        position: ['', Validators.required],
        birthday: ['', Validators.required],
        age: ['', Validators.required],
        address: ['', Validators.required],     
      });
      console.log( this.createUser);
      this.onSaveProfile();

    }



    onSaveUser() {
      let request = new User();
      request.userCode = this.createUser.controls['userCode'].value;
      request.lineManager = this.createUser.controls['lineManager'].value
      // console.log(request)
      this.userService.insertUser(request).subscribe((res) => {     
        console.log(res);
      },
        (error) => {
          console.log(error);
        });
    }

    onSaveProfile() {      
      let request = new ReqInsertUserProfile;
      request.userCode = this.createProfile.controls['userCode'].value;
      request.firstName = this.createProfile.controls['firstName'].value;
      request.lastName = this.createProfile.controls['lastName'].value;
      request.birthday = this.createProfile.controls['birthday'].value;
      request.age = this.createProfile.controls['age'].value;
      request.address = this.createProfile.controls['address'].value;
      request.position = this.createProfile.controls['position'].value;
      console.log(request)
      this.userProfileService.insertProfile(request).subscribe((res) => {
        console.log("Insert UserProfile Success");
        console.log(res);
      },
        (error) => {
         
          console.log(error);
        });
    }

  showAccessToken(){
    var data = JSON.parse(sessionStorage.getItem('token'));
    // console.log("accessToken", data.accessToken)    
  }

}
