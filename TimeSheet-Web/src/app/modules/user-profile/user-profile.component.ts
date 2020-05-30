import { RequestInquiryUser } from './../../shared/model/request-user-project';
import { ReqInsertUserProfile } from './../../shared/model/req-user-profile';
import { Router } from '@angular/router';
import { EditUserProfileDialogComponent } from './edit-user-profile-dialog/edit-user-profile-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RequestInquiryProfile,  } from 'src/app/shared/model/req-user-profile';
import { UserProfileService } from 'src/app/service/user-profile.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { noWhitespaceValidator } from 'src/app/shared/noWhitespaceValidator'
import { Message } from 'src/app/shared/model/message';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/service/user.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/common/date.adapter';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class UserProfileComponent implements OnInit {

  @ViewChild("saveSwal", { static: false }) saveSwal: SwalComponent;
  @ViewChild("saveSucessSwal", { static: false }) saveSucessSwal: SwalComponent;
  createProfile: FormGroup;
  submitted = false;
  setToken: any;
  dataUser: any;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private _FormBuild: FormBuilder,
    private userService: UserService,
    private noWhitespaceValidator: noWhitespaceValidator,
    private loading: NgxSpinnerService,
    private userProfileService: UserProfileService,
    

  ) { }

  ngOnInit() {
    this.getUser();   
    this.createProfile = new FormGroup({
      userCode: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      position: new FormControl(),
      birthday: new FormControl(),
      age: new FormControl(),
      address: new FormControl(),
      site: new FormControl()
    });
  }

  getUser() {
    let request = new RequestInquiryUser();
    let data: any;
    this.dataUser = JSON.parse(sessionStorage.getItem('userProfileIam'));
    request.userCode = this.dataUser.userCode;
    this.userService.inquiryUser(request).subscribe((res) => {
      console.log(res.data[0].userCode);
      data = res.data;
      this.inquiryUserProfile(data);
      this.setFromProfile(data);
    }, (error) => { 
      console.log(error);
    });
  }  

  get f() { return this.createProfile.controls; }

  inquiryUserProfile(data){
    let request = new RequestInquiryProfile();    
    request.userCode = data[0].userCode;
    console.log(request)
    this.userProfileService.inquiryUserProfile(request).subscribe((res) => {
      console.log(res);
      data = res.data;
      this.setFromProfile(data);
    }, (error) => { 
      console.log(error);
    });
  }


  setFromProfile(dataUser) {
    console.log(dataUser)
    this.createProfile = this._FormBuild.group({
      userCode: [dataUser[0].userCode, Validators.required],
      firstName: [dataUser[0].firstName, Validators.required],
      lastName: [dataUser[0].lastName, Validators.required],
      position: [dataUser[0].position, Validators.required],
      birthday: [dataUser[0].birthday, Validators.required],
      age: [dataUser[0].age, Validators.required],
      address: [dataUser[0].address, Validators.required],
      site: [dataUser[0].site, Validators.required]
    });
    console.log(this.createProfile)
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.createProfile)
    if (this.createProfile.invalid) {
      return;
    } else {
      this.saveSwal.title = Message.MESSAGE_SAVE;
      this.saveSwal.fire();
    }
  }

  onSave() {
    this.loading.show();
    let request = new ReqInsertUserProfile;
    request.userCode = this.createProfile.controls['userCode'].value;
    request.firstName = this.createProfile.controls['firstName'].value;
    request.lastName = this.createProfile.controls['lastName'].value;
    request.birthday = this.createProfile.controls['birthday'].value;
    request.age = this.createProfile.controls['age'].value;
    request.address = this.createProfile.controls['address'].value;
    request.position = this.createProfile.controls['position'].value;
    request.site = this.createProfile.controls['site'].value;
    this.userProfileService.insertProfile(request).subscribe((res) => {
      console.log("Insert UserProfile Success");
      console.log(res);
      this.loading.hide();
      this.saveSucessSwal.title = Message.MESSAGE_SAVE_SUCCESS;
      this.saveSucessSwal.fire();
    },
      (error) => {
        this.loading.hide();
        console.log(error);
      });
  }

  openDialogEdit(dataProfile) {
    console.log('The dialog was open add');
    const dialogRef = this.dialog.open(EditUserProfileDialogComponent, {
      width: '1000px',
      data: dataProfile,
      position: {
        top: '10%',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getUser();
        console.log("Edit Success!")
      }
    });
  }

}
