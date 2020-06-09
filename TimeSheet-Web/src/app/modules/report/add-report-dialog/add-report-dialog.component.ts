import { UserService } from './../../../service/user.service';
import { ReportService } from './../../../service/report.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MatDialogRef } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/common/date.adapter';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { noWhitespaceValidator } from 'src/app/shared/noWhitespaceValidator';
import { RequestInquiryUser } from 'src/app/shared/model/user';
import { Message } from 'src/app/shared/model/message';
import { RequestInsertReport } from 'src/app/shared/model/report';


@Component({
  selector: 'app-add-report-dialog',
  templateUrl: './add-report-dialog.component.html',
  styleUrls: ['./add-report-dialog.component.scss'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class AddReportDialogComponent implements OnInit {
  @ViewChild("saveSwal", { static: false }) saveSwal: SwalComponent;
  @ViewChild("saveSucessSwal", { static: false }) saveSucessSwal: SwalComponent;
  createReport: FormGroup
  submitted = false;
  dataProfile: any;

  constructor(
    public dialogRef: MatDialogRef<AddReportDialogComponent>,
    private _FormBuild: FormBuilder,  
    private loading: NgxSpinnerService,
    private noWhitespaceValidator: noWhitespaceValidator,
    private requestReport: ReportService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUser();
    this.createReport = new FormGroup({
      userCode: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      totalHours: new FormControl(),
      task: new FormControl(),
      feedBack: new FormControl(),
      goal: new FormControl(),
    }); 
  }

  get f() { return this.createReport.controls; }

  getUser() {
    let request = new RequestInquiryUser();
    let data: any;
    this.dataProfile = JSON.parse(sessionStorage.getItem('userProfileIam'));
    request.userCode = this.dataProfile.userCode;
    this.userService.inquiryUser(request).subscribe((res) => {
      console.log(res);
      data = res.data[0];
      this.setFormReport(data);
    }, (error) => {
      console.log(error);
    });
  }
  
  setFormReport(dataUser){
    this.createReport = this._FormBuild.group({
      userCode:[dataUser.userCode,Validators.required],  
      startDate:['', Validators.required],
      endDate:['', Validators.required],
      task:['',Validators.required, this.noWhitespaceValidator.noWhitespace],
      totalHours:['',Validators.required, this.noWhitespaceValidator.noWhitespace],
      feedBack:['',Validators.required, this.noWhitespaceValidator.noWhitespace],
      goal:['',Validators.required, this.noWhitespaceValidator.noWhitespace],
    })
    console.log(this.createReport)
  }

  onSubmit() {
    this.submitted = true;
    if (this.createReport.invalid) {
      return;
    } else {
      this.saveSwal.title = Message.MESSAGE_SAVE;
      this.saveSwal.fire();
    }
  }

  onSave(){
    console.log(this.createReport);
    let requestInsert = new RequestInsertReport();     
    requestInsert.userCode = this.createReport.controls['userCode'].value;
    requestInsert.startDate = this.createReport.controls['startDate'].value;
    requestInsert.endDate = this.createReport.controls['endDate'].value;
    requestInsert.task = this.createReport.controls['task'].value;
    requestInsert.totalHours = this.createReport.controls['totalHours'].value;
    requestInsert.feedBack = this.createReport.controls['feedBack'].value;
    requestInsert.goal = this.createReport.controls['goal'].value;

    this.requestReport.insetReport(requestInsert).subscribe((res) => {
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
