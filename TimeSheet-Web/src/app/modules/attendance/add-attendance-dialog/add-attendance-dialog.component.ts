import { RequestProfileService } from './../../../service/request-profile.service';
import { RequestAttendanceService } from './../../../service/request-attendance.service';
import { ReqInsertAttendance, RequestInquiryAttendace } from './../../../shared/model/requestAttendance';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Message } from 'src/app/shared/model/message';
import { ReqProfile } from 'src/app/shared/model/reqLogin';
import { noWhitespaceValidator } from './../../../shared/noWhitespaceValidator';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserProfileService } from 'src/app/service/user-profile.service';

@Component({
  selector: 'app-add-attendance-dialog',
  templateUrl: './add-attendance-dialog.component.html',
  styleUrls: ['./add-attendance-dialog.component.scss']
})
export class AddAttendanceDialogComponent implements OnInit {
  @ViewChild("saveSwal", { static: false }) saveSwal: SwalComponent;
  @ViewChild("saveSucessSwal", { static: false }) saveSucessSwal: SwalComponent;

  createAttendance: FormGroup
  submitted = false;
  dataUser: any;
  setToken: any;
  dataProfile: any;

  constructor(
    public dialogRef: MatDialogRef<AddAttendanceDialogComponent>,
    private _FormBuild: FormBuilder,  
    private requestAttendance: RequestAttendanceService,
    private reqProfileService: RequestProfileService,
    private userProfileService: UserProfileService,
    private loading: NgxSpinnerService,
    private noWhitespaceValidator: noWhitespaceValidator,
  ) { }

  ngOnInit() {
    this.getUserProfile();
    this.createAttendance = new FormGroup({
      userCode: new FormControl(),
      date: new FormControl(),
      project:new FormControl(),
        task:new FormControl(),
        timeIn:new FormControl(),
        timeOut:new FormControl(),
        site: new FormControl(),
    }); 
  }
  

    get f() { return this.createAttendance.controls; }

    getUserProfile() {
      let request = new RequestInquiryAttendace();
      let data: any;
      this.dataProfile = JSON.parse(sessionStorage.getItem('userProfileIam'));
      request.userCode = this.dataProfile.userCode;
      this.userProfileService.inquiryUserProfile(request).subscribe((res) => {
        console.log(res);
        data = res.data[0];
        this.setFormAttendance(data);
      }, (error) => {
          console.log(error);
      }
      );
      }

    setFormAttendance(dataUser){
      this.createAttendance = this._FormBuild.group({
        userCode:[dataUser.userCode,Validators.required],
        date:['',Validators.required],
        project:['',Validators.required, this.noWhitespaceValidator.noWhitespace],
        task:['',Validators.required, this.noWhitespaceValidator.noWhitespace],
        timeIn:['',Validators.required, this.noWhitespaceValidator.noWhitespace],
        timeOut:['',Validators.required, this.noWhitespaceValidator.noWhitespace],
        site:['',Validators.required, this.noWhitespaceValidator.noWhitespace],
      })
    }

    onSubmit() {
      this.submitted = true;
      if (this.createAttendance.invalid) {
        return;
      } else {
        this.saveSwal.title = Message.MESSAGE_SAVE;
        this.saveSwal.fire();
      }
    }

    onSave(){
      console.log(this.createAttendance);
      let requestInsert = new ReqInsertAttendance();     
      requestInsert.userCode = this.createAttendance.controls['userCode'].value;
      requestInsert.date = this.createAttendance.controls['date'].value;
      requestInsert.project = this.createAttendance.controls['project'].value;
      requestInsert.task = this.createAttendance.controls['task'].value;
      requestInsert.timeIn = this.createAttendance.controls['timeIn'].value;
      requestInsert.timeOut = this.createAttendance.controls['timeOut'].value;
      requestInsert.site = this.createAttendance.controls['site'].value;

      this.requestAttendance.insetAttendance(requestInsert).subscribe((res) => {
        this.loading.hide();
        this.saveSucessSwal.title = Message.MESSAGE_SAVE_SUCCESS;
        this.saveSucessSwal.fire(); 
        console.log(res)    
      }, (error) => {
        this.loading.hide();
        console.log(error);
      });
    }


  canCle(status){
    this.dialogRef.close(status);        
  }

}
