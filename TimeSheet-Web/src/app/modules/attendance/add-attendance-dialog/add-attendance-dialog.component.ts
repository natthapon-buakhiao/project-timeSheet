import { RequestAttendanceService } from './../../../service/request-attendance.service';
import { ReqInsertAttendance, RequestInquiryAttendace } from './../../../shared/model/requestAttendance';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Message } from 'src/app/shared/model/message';
import { noWhitespaceValidator } from 'src/app/shared/noWhitespaceValidator';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { UserService } from 'src/app/service/user.service';
import { RequestInquiryUser } from 'src/app/shared/model/request-user-project';
import { RequestUserProjectService } from 'src/app/service/request-user-project.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-add-attendance-dialog',
  templateUrl: './add-attendance-dialog.component.html',
  styleUrls: ['./add-attendance-dialog.component.scss']
})
export class AddAttendanceDialogComponent implements OnInit {
  @ViewChild('saveSwal', { static: false }) saveSwal: SwalComponent;
  @ViewChild('saveSucessSwal', { static: false }) saveSucessSwal: SwalComponent;

  createAttendance: FormGroup;
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
    public dialog: MatDialog,   
    @Inject(MAT_DIALOG_DATA) public data: any,   
    private noWhitespaceValidator: noWhitespaceValidator,   
    private loading: NgxSpinnerService,
  ) { }

  ngOnInit() {
   
    this.createAttendance = new FormGroup({
      userCode: new FormControl(),
      date: new FormControl(new Date()),
      projectCode: new FormControl(),
      task: new FormControl(),
      timeIn: new FormControl(),
      timeOut: new FormControl(),
      siteCode: new FormControl(),
    });
    this.setFormAttendance();    
  }

  get f() { return this.createAttendance.controls; }

  setFormAttendance() {        
    this.dataProfile = JSON.parse(sessionStorage.getItem('userProfileIam'));
    this.dataSite = JSON.parse(localStorage.getItem('dataSite'));
    this.project = JSON.parse(localStorage.getItem('project'));
    this.createAttendance = this._FormBuild.group({
      userCode: [this.dataProfile.userCode, Validators.required],
      date: [new Date(), Validators.required],
      projectCode: ['', Validators.required, this.noWhitespaceValidator.noWhitespace],
      task: ['', Validators.required, this.noWhitespaceValidator.noWhitespace],
      timeIn: ['', Validators.required, this.noWhitespaceValidator.noWhitespace],
      timeOut: ['', Validators.required, this.noWhitespaceValidator.noWhitespace],
      siteCode: ['', Validators.required, this.noWhitespaceValidator.noWhitespace],
    });
    console.log(this.createAttendance);
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
    const requestInsert = new ReqInsertAttendance();
    requestInsert.userCode = this.createAttendance.controls.userCode.value;
    requestInsert.date = this.createAttendance.controls.date.value;
    requestInsert.projectCode = this.createAttendance.controls.projectCode.value;
    requestInsert.task = this.createAttendance.controls.task.value;
    requestInsert.timeIn = this.createAttendance.controls.timeIn.value;
    requestInsert.timeOut = this.createAttendance.controls.timeOut.value;
    requestInsert.siteCode = this.createAttendance.controls.siteCode.value;
    console.log(requestInsert)
    this.requestAttendance.insetAttendance(requestInsert).subscribe((res) => {      
      this.saveSucessSwal.title = Message.MESSAGE_SAVE_SUCCESS;
      this.saveSucessSwal.fire();
      console.log(res);
    }, (error) => {      
      console.log(error);
    });
  }


  canCle(status) {
    this.loading.show();
    setTimeout(() => {      
      this.loading.hide();
    }, 500);
    this.dialogRef.close(status);
  }

}
