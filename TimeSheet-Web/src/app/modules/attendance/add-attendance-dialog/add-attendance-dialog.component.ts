import { RequestAttendanceService } from './../../../service/request-attendance.service';
import { ReqInsertAttendance } from './../../../shared/model/requestAttendance';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'src/app/shared/model/message';


@Component({
  selector: 'app-add-attendance-dialog',
  templateUrl: './add-attendance-dialog.component.html',
  styleUrls: ['./add-attendance-dialog.component.scss']
})
export class AddAttendanceDialogComponent implements OnInit {

  createAttendance: FormGroup
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<AddAttendanceDialogComponent>,
    private _FormBuild: FormBuilder,  
    private requestAttendance: RequestAttendanceService,
  ) { }

  ngOnInit() {
    this.setFormAttendance();
  }

    get f() { return this.createAttendance.controls; }

    setFormAttendance(){
      this.createAttendance = this._FormBuild.group({
        date:['',Validators.required],
        project:['',Validators.required],
        task:['',Validators.required],
        timeIn:['',Validators.required],
        timeOut:['',Validators.required],
        site:['',Validators.required],
      })
    }

    onSubmit() {
      this.submitted = true;
      if (this.createAttendance.invalid) {
        return;
      } else {
        // this.saveSwal.title = Message.MESSAGE_SAVE;
        // this.saveSwal.fire();
      }
    }

    onSave(){
      console.log(this.createAttendance);
      let requestInsert = new ReqInsertAttendance();
      requestInsert.date = this.createAttendance.controls['date'].value;
      requestInsert.project = this.createAttendance.controls['project'].value;
      requestInsert.task = this.createAttendance.controls['task'].value;
      requestInsert.timeIn = this.createAttendance.controls['timeIn'].value;
      requestInsert.timeOut = this.createAttendance.controls['timeOut'].value;
      requestInsert.site = this.createAttendance.controls['site'].value;

      this.requestAttendance.insetAttendance(requestInsert).subscribe((res) => {
        // this.loading.hide();
        // this.saveSucessSwal.title = Message.MESSAGE_SAVE_SUCCESS;
        // this.saveSucessSwal.fire();
        console.log(res)
      }, (error) => {
        // this.loading.hide();
        console.log(error);
      });
    }


  canCle(){
    this.dialogRef.close(status);        
  }

}
