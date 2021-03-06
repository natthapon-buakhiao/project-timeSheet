import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { UserProfileService } from 'src/app/service/user-profile.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Message } from 'src/app/shared/model/message';
import { RequestInquiryProfile, ReqEditUserProfile } from 'src/app/shared/model/req-user-profile';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/common/date.adapter';

@Component({
  selector: 'app-edit-user-profile-dialog',
  templateUrl: './edit-user-profile-dialog.component.html',
  styleUrls: ['./edit-user-profile-dialog.component.scss']
})
export class EditUserProfileDialogComponent implements OnInit {
  @ViewChild('saveSwal', { static: false }) saveSwal: SwalComponent;
  @ViewChild('saveSucessSwal', { static: false }) saveSucessSwal: SwalComponent;
  editProfile: FormGroup;
  submitted = false;
  dataProfile: any;
  userCode: any;

  constructor(
    public dialogRef: MatDialogRef<EditUserProfileDialogComponent>,
    public dialog: MatDialog,
    private _FormBuild: FormBuilder,
    private userProfileService: UserProfileService,
    private loading: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    console.log(this.data);    
    this.editProfile = new FormGroup({
      userCode: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      position: new FormControl(),
      birthday: new FormControl(),
      age: new FormControl(),
      address: new FormControl(),
    });
    this.setFromProfile(this.data);
  }
  

  get f() { return this.editProfile.controls; }


  setFromProfile(dataProfile) {
    console.log(dataProfile);
    this.editProfile = this._FormBuild.group({
      userCode: [dataProfile.id.user.userCode, Validators.required],
      firstName: [dataProfile.firstName, Validators.required],
      lastName: [dataProfile.lastName, Validators.required],
      position: [dataProfile.position, Validators.required],
      birthday: [dataProfile.birthday, Validators.required],
      age: [dataProfile.age, Validators.required],
      address: [dataProfile.address, Validators.required],
    });
    console.log(this.editProfile);

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
    const request = new ReqEditUserProfile();
    request.userCode = this.editProfile.controls.userCode.value;
    request.firstName = this.editProfile.controls.firstName.value;
    request.lastName = this.editProfile.controls.lastName.value;
    request.birthday = this.editProfile.controls.birthday.value;
    request.age = this.editProfile.controls.age.value;
    request.address = this.editProfile.controls.address.value;
    request.position = this.editProfile.controls.position.value;
    this.userProfileService.editProfile(request).subscribe((res) => {
      console.log('edit UserProfile Success');
      console.log(res);     
      this.saveSucessSwal.title = Message.MESSAGE_SAVE_SUCCESS;
      this.saveSucessSwal.fire();
    },
      (error) => {      
        console.log(error);
      });
  }


  canCle(status) {
    this.dialogRef.close(status);
    this.loading.show();
    setTimeout(() => {      
      this.loading.hide();
    }, 500);
  }
}
