import { Router } from '@angular/router';
import { EditUserProfileDialogComponent } from './edit-user-profile-dialog/edit-user-profile-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReqProfile } from 'src/app/shared/model/reqLogin';
import { RequestProfileService } from 'src/app/service/request-profile.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReqUserProfile } from 'src/app/shared/model/req-user-profile';
import { UserProfileService } from 'src/app/service/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  createProfileGroup: FormGroup;
  submitted = false;
  setToken: any;
  dataProfile: any;


  constructor(
    public dialog: MatDialog,
    private router: Router,
    private reqProfileService: RequestProfileService,
    private formBuild: FormBuilder,
    private userProfileService: UserProfileService,
  ) { }

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    let request = new ReqProfile();
    this.setToken = JSON.parse(sessionStorage.getItem('accessToken'));
    request.token = this.setToken;
    console.log(request);

    this.reqProfileService.getProfile(request).subscribe((res)  => {
      this.dataProfile = res;
      console.log( this.dataProfile);
      this.setFromProfile(res);
    }, (error) => {
      console.log(error);
     });
    }

    get f() { return null; }


    setFromProfile(dataProfile) {
      this.createProfileGroup = this.formBuild.group({
        userCode: [dataProfile.userCode],
        firstName: [dataProfile.localFirstName],
        lastName: [dataProfile.localLastName],
        position: [dataProfile.position],
        birthday: [''],
        age: [''],
        address: [''],
        site: [dataProfile.department]
      });
      console.log( this.createProfileGroup);

    }

    onSubmit() {
      this.submitted = true;
      if (this.createProfileGroup.invalid) {
        return;
      } else {
        // this.saveSwal.title = Message.MESSAGE_SAVE;
        // this.saveSwal.fire();
      }
    }

    onSave() {
      // this.loading.show();
      let request = new ReqUserProfile();
      request.userCode = this.createProfileGroup.controls.userCode.value;
      request.firstName = this.createProfileGroup.controls.firstName.value;
      request.lastName = this.createProfileGroup.controls.lastName.value;
      request.birthday = this.createProfileGroup.controls.birthday.value;
      request.age = this.createProfileGroup.controls.age.value;
      request.address = this.createProfileGroup.controls.address.value;
      request.position = this.createProfileGroup.controls.position.value;
      request.site = this.createProfileGroup.controls.site.value;
      this.userProfileService.insetProfile(request).subscribe((res) => {
        console.log("edit Customer Success");
        console.log(res);
        // this.loading.hide();
        // this.saveSucessSwal.title = Message.MESSAGE_SAVE_SUCCESS;
        // this.saveSucessSwal.fire();
      },
        (error) => {
        //  this.loading.hide();
          console.log(error);
        });
    }

  openDialogEdit() {
    console.log('The dialog was open add');
    const dialogRef = this.dialog.open(EditUserProfileDialogComponent, {
      width: '750px',
      position: {
        top: '10%',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Edit Success!")
      }
    });

  }

  back(){
    this.router.navigate(['/attendance']);
  }

  
}
