import { EditUserProfileDialogComponent } from './edit-user-profile-dialog/edit-user-profile-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RequestInquiryProfile,  } from 'src/app/shared/model/req-user-profile';
import { UserProfileService } from 'src/app/service/user-profile.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';


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
  dataUser: any;
  dataProfile: any;

  constructor(
    public dialog: MatDialog,
    private _FormBuild: FormBuilder,    
    private loading: NgxSpinnerService,
    private userProfileService: UserProfileService,


  ) { }

  ngOnInit() {
    this.loading.show();
    setTimeout(() => {      
      this.loading.hide();
    }, 500);
   
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
    this.inquiryUserProfile();
  }

  get f() { return this.createProfile.controls; }

  inquiryUserProfile() {
    const request = new RequestInquiryProfile();
    let data: any;
    this.dataUser = JSON.parse(sessionStorage.getItem('userProfileIam'));
    request.userCode = this.dataUser.userCode;
    console.log(request)
    this.userProfileService.inquiryUserProfile(request).subscribe((res) => {
      console.log(res);
      data = res.data;
      this.dataProfile = res.data[0];
      this.setFromProfile(data);
    }, (error) => {
      console.log(error);
    });
  }


  setFromProfile(dataUser) {
    console.log(dataUser)
    this.createProfile = this._FormBuild.group({
      userCode: [dataUser.userCode, Validators.required],
      firstName: [dataUser[0].firstName, Validators.required],
      lastName: [dataUser[0].lastName, Validators.required],
      position: [dataUser[0].position, Validators.required],
      birthday: [dataUser[0].birthday, Validators.required],
      age: [dataUser[0].age, Validators.required],
      address: [dataUser[0].address, Validators.required],
    });
    console.log(this.createProfile)
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
        this.inquiryUserProfile();
        console.log("Edit Success!")
      }
    });
  }

}
