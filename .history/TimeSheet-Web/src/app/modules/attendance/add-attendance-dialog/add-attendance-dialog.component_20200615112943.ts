import { RequestAttendanceService } from './../../../service/request-attendance.service';
import { ReqInsertAttendance, RequestInquiryAttendace } from './../../../shared/model/requestAttendance';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Message } from 'src/app/shared/model/message';
import { noWhitespaceValidator } from 'src/app/shared/noWhitespaceValidator';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/service/user.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/common/date.adapter';
import { RequestInquiryUser } from 'src/app/shared/model/request-user-project';
import { RequestUserProjectService } from 'src/app/service/request-user-project.service';


@Component({
  selector: 'app-add-attendance-dialog',
  templateUrl: './add-attendance-dialog.component.html',
  styleUrls: ['./add-attendance-dialog.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    },
  ]
})
export class AddAttendanceDialogComponent implements OnInit {
  @ViewChild("saveSwal", { static: false }) saveSwal: SwalComponent;
  @ViewChild("saveSucessSwal", { static: false }) saveSucessSwal: SwalComponent;

  createAttendance: FormGroup
  submitted = false;
  dataUser: any;
  setToken: any;
  dataProfile: any;
  project: any;
  dataSite: any;

  constructor(
    public dialogRef: MatDialogRef<AddAttendanceDialogComponent>,
    private _FormBuild: FormBuilder,
    private requestAttendance: RequestAttendanceService,    
    private userService: UserService,
    private loading: NgxSpinnerService,
    private noWhitespaceValidator: noWhitespaceValidator,    
    private reqUserProject: RequestUserProjectService
  ) { }

  ngOnInit() {

    this.inquiryUserProject();
    this.getUser();
    this.createAttendance = new FormGroup({
      userCode: new FormControl(),
      date: new FormControl(new Date()),
      projectCode: new FormControl(),
      task: new FormControl(),
      timeIn: new FormControl(),
      timeOut: new FormControl(),
      siteCode: new FormControl(),
    });
    this.getAllSite()
  }


  get f() { return this.createAttendance.controls; }

  getUser() {
    let request = new RequestInquiryAttendace();
    let data: any;
    this.dataProfile = JSON.parse(sessionStorage.getItem('userProfileIam'));
    request.userCode = this.dataProfile.userCode;
    this.userService.inquiryUser(request).subscribe((res) => {
      console.log(res);
      data = res.data[0];
      this.setFormAttendance(data);
    }, (error) => {
      console.log(error);
    });
  }

  getAllSite(){
    this.requestAttendance.getAllSite().subscribe((res) => {
      console.log(res)
      this.dataSite = res.data;     
    },
      (error) => {
        console.log(error + "get Fail!!")
      });
  }


  inquiryUserProject() {
    let request = new RequestInquiryUser();
    this.dataProfile = JSON.parse(sessionStorage.getItem('userProfileIam'));
    request.userCode = this.dataProfile.userCode;
    console.log(request)
    this.reqUserProject.inquiryUserProject(request).subscribe((res) => {
      console.log(res)
      this.project = res.data;
      // console.log(this.project)
    },
      (error) => {
        console.log(error + "get Fail!!")
      })
  }

  setFormAttendance(dataUser) {
    console.log(dataUser)
    this.createAttendance = this._FormBuild.group({
      userCode: [dataUser.userCode, Validators.required],
      date: ['', Validators.required],
      projectCode: ['', Validators.required, this.noWhitespaceValidator.noWhitespace],
      task: ['', Validators.required, this.noWhitespaceValidator.noWhitespace],
      timeIn: ['', Validators.required, this.noWhitespaceValidator.noWhitespace],
      timeOut: ['', Validators.required, this.noWhitespaceValidator.noWhitespace],
      siteCode: ['', Validators.required, this.noWhitespaceValidator.noWhitespace],
    })
    console.log(this.createAttendance)
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

  onSave() {
    console.log(this.createAttendance);
    let requestInsert = new ReqInsertAttendance();
    requestInsert.userCode = this.createAttendance.controls['userCode'].value;
    requestInsert.date = this.createAttendance.controls['date'].value;
    requestInsert.projectCode = this.createAttendance.controls['projectCode'].value;
    requestInsert.task = this.createAttendance.controls['task'].value;
    requestInsert.timeIn = this.createAttendance.controls['timeIn'].value;
    requestInsert.timeOut = this.createAttendance.controls['timeOut'].value;
    requestInsert.siteCode = this.createAttendance.controls['siteCode'].value;

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


  canCle(status) {
    this.dialogRef.close(status);
  }

}
