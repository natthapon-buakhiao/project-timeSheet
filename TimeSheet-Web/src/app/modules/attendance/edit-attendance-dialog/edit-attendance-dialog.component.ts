import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Message } from 'src/app/shared/model/message';
import { RequestAttendanceService } from 'src/app/service/request-attendance.service';
import { ReqEditAttendance } from 'src/app/shared/model/requestAttendance';
import { RequestInquiryUser } from 'src/app/shared/model/request-user-project';
import { RequestUserProjectService } from 'src/app/service/request-user-project.service';

@Component({
  selector: 'app-edit-attendance-dialog',
  templateUrl: './edit-attendance-dialog.component.html',
  styleUrls: ['./edit-attendance-dialog.component.scss']
})
export class EditAttendanceDialogComponent implements OnInit {
  @ViewChild("saveSwal", { static: false }) saveSwal: SwalComponent;
  @ViewChild("saveSucessSwal", { static: false }) saveSucessSwal: SwalComponent;
  createEditAttendance: FormGroup;
  submitted = false;
  dataAttendance: any;
  project: any;
  dataProfile: any;
  dataSite: any;

  constructor(
    public dialogRef: MatDialogRef<EditAttendanceDialogComponent>,
    public dialog: MatDialog,   
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _FormBuild: FormBuilder,
    private  requestAttendance: RequestAttendanceService,
    private reqUserProject: RequestUserProjectService
  ) { }

  ngOnInit() {
   
    this.dataAttendance = this.data;
 
    this.createEditAttendance = new FormGroup({
      id: new FormControl(),
      date: new FormControl(new Date()),
      projectCode: new FormControl(),
      task: new FormControl(),
      timeIn: new FormControl(),
      timeOut: new FormControl(),
      siteCode: new FormControl(),
    });  
    this.setFromEditAttendance(this.dataAttendance);
  }

  setFromEditAttendance(dataAttendance) {
    this.dataSite = JSON.parse(localStorage.getItem('dataSite'));
    this.project = JSON.parse(localStorage.getItem('project'));
    console.log(dataAttendance)
    this.createEditAttendance = this._FormBuild.group({
      id: [dataAttendance.id, Validators.required],
      date: [new Date(), Validators.required],
      projectCode: [dataAttendance.project.projectCode, Validators.required],
      task: [dataAttendance.task, Validators.required],
      timeIn: [dataAttendance.timeIn, Validators.required],
      timeOut: [dataAttendance.timeOut, Validators.required],
      siteCode: [dataAttendance.site.siteCode, Validators.required],
    });
    console.log(this.createEditAttendance);

  }

  onSubmit() {
    this.submitted = true;
    if (this.createEditAttendance.invalid) {
      return;
    } else {
      this.saveSwal.title = Message.MESSAGE_SAVE;
      this.saveSwal.fire();
    }
  }

  onSave() {    
    let requestEdit = new ReqEditAttendance();
    requestEdit.id = this.createEditAttendance.controls['id'].value;
    requestEdit.date = this.createEditAttendance.controls['date'].value;
    requestEdit.projectCode = this.createEditAttendance.controls['projectCode'].value;
    requestEdit.task = this.createEditAttendance.controls['task'].value;
    requestEdit.timeIn = this.createEditAttendance.controls['timeIn'].value;
    requestEdit.timeOut = this.createEditAttendance.controls['timeOut'].value;
    requestEdit.siteCode = this.createEditAttendance.controls['siteCode'].value;
    this.requestAttendance.editAttendance(requestEdit).subscribe((res) => {
      console.log("edit Attendance Success");
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
  }

}
