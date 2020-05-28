import { Router } from '@angular/router';
import { EditUserProfileDialogComponent } from './edit-user-profile-dialog/edit-user-profile-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReqProfile } from 'src/app/shared/model/reqLogin';
import { RequestProfileService } from 'src/app/service/request-profile.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ReqUserProfile, RequestInquiryProfile } from 'src/app/shared/model/req-user-profile';
import { UserProfileService } from 'src/app/service/user-profile.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { noWhitespaceValidator } from 'src/app/shared/noWhitespaceValidator';
import { Message } from 'src/app/shared/model/message';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @ViewChild("saveSwal", { static: false }) saveSwal: SwalComponent;
  @ViewChild("saveSucessSwal", { static: false }) saveSucessSwal: SwalComponent;
  createProfile: FormGroup;
  submitted = false;
  setToken: any;
  dataProfile: any;


  constructor(
    public dialog: MatDialog,
    private router: Router,
    private reqProfileService: RequestProfileService,
    private _FormBuild: FormBuilder,
    private userProfileService: UserProfileService,
    private loading: NgxSpinnerService,
    private noWhitespaceValidator: noWhitespaceValidator,
  ) { }

  ngOnInit() {
    this.getUserProfile();
    this.createProfile = new FormGroup({
      userCode: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      position: new FormControl(),
      birthday:new FormControl(),
      age: new FormControl(),
      address: new FormControl(),
      site: new FormControl()
    });
  }

  getUserProfile() {
    let request = new RequestInquiryProfile();
    let data: any;
    this.dataProfile = JSON.parse(sessionStorage.getItem('userProfileIam'));
    request.userCode = this.dataProfile.userCode;
    this.userProfileService.inquiryUserProfile(request).subscribe((res) => {
      console.log(res);
      data = res.data[0];
      this.setFromProfile(data);
    }, (error) => {
        console.log(error);
    }
    );
    }

    get f() { return this.createProfile.controls; }


    setFromProfile(dataProfile) {
      this.createProfile = this._FormBuild.group({
        userCode: [dataProfile.userCode,Validators.required],
        firstName: [dataProfile.firstName,Validators.required],
        lastName: [dataProfile.lastName,Validators.required],
        position: [dataProfile.position,Validators.required],
        birthday: [dataProfile.birthday,Validators.required],
        age: [dataProfile.age,Validators.required],
        address: [dataProfile.address,Validators.required],
        site: [dataProfile.site,Validators.required]
      });
      console.log( this.createProfile);

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
        this.getUserProfile();
        console.log("Edit Success!")
      }
    });

  }




  back(){
    this.router.navigate(['/attendance']);
  }

  
}
