import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { RequestProfileService } from 'src/app/service/request-profile.service';
import { UserProfileService } from 'src/app/service/user-profile.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReqProfile } from 'src/app/shared/model/reqLogin';
import { Message } from 'src/app/shared/model/message';
import { ReqUserProfile, RequestInquiryProfile, ReqEditUserProfile } from 'src/app/shared/model/req-user-profile';

@Component({
  selector: 'app-edit-user-profile-dialog',
  templateUrl: './edit-user-profile-dialog.component.html',
  styleUrls: ['./edit-user-profile-dialog.component.scss']
})
export class EditUserProfileDialogComponent implements OnInit {
  @ViewChild("saveSwal", { static: false }) saveSwal: SwalComponent;
  @ViewChild("saveSucessSwal", { static: false }) saveSucessSwal: SwalComponent;
  editProfile: FormGroup;
  submitted = false;
  dataProfile: any;
  userCode: any;



  constructor(
    public dialogRef: MatDialogRef<EditUserProfileDialogComponent>,
    public dialog: MatDialog,    
    private reqProfileService: RequestProfileService,
    private _FormBuild: FormBuilder,
    private userProfileService: UserProfileService,
    private loading: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    console.log(this.data.userCode);
    this.getUserProfile(this.data.userCode);
    this.editProfile = new FormGroup({
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

  getUserProfile(userCode) {
    let request = new RequestInquiryProfile();
    let data: any;
    this.userCode = userCode;
    request.userCode = this.userCode;
    this.userProfileService.inquiryUserProfile(request).subscribe((res) => {
      console.log(res);
      data = res.data[0];
      this.setFromProfile(data);
    }, (error) => {
        console.log(error);
    }
    );
    }

    get f() { return this.editProfile.controls; }


    setFromProfile(dataProfile) {
      this.editProfile = this._FormBuild.group({
        userCode: [dataProfile.userCode,Validators.required],
        firstName: [dataProfile.firstName,Validators.required],
        lastName: [dataProfile.lastName,Validators.required],
        position: [dataProfile.position,Validators.required],
        birthday: [dataProfile.birthday,Validators.required],
        age: [dataProfile.age,Validators.required],
        address: [dataProfile.address,Validators.required],
        site: [dataProfile.site,Validators.required]
      });
      console.log( this.editProfile);

    }

    onSubmit() {
      this.submitted = true;
      if (this.editProfile.invalid) {
        return;
      } else {
        this.saveSwal.title = Message.MESSAGE_SAVE;
        this.saveSwal.fire();
      }
    }

    onSave() {
      this.loading.show();
      let request = new ReqEditUserProfile();
      request.userCode = this.editProfile.controls['userCode'].value;
      request.firstName = this.editProfile.controls['firstName'].value;
      request.lastName = this.editProfile.controls['lastName'].value;
      request.birthday = this.editProfile.controls['birthday'].value;
      request.age = this.editProfile.controls['age'].value;
      request.address = this.editProfile.controls['address'].value;
      request.position = this.editProfile.controls['position'].value;
      request.site = this.editProfile.controls['site'].value;
      this.userProfileService.editProfile(request).subscribe((res) => {
        console.log("edit UserProfile Success");
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


    canCle(status){
      this.dialogRef.close(status)        
    }


}
