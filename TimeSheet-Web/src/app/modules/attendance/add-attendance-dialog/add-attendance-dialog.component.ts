import { ReqInsertAttendance } from './../../../shared/model/requestAttendance';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-attendance-dialog',
  templateUrl: './add-attendance-dialog.component.html',
  styleUrls: ['./add-attendance-dialog.component.scss']
})
export class AddAttendanceDialogComponent implements OnInit {

  // createAttendance: FormGroup
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<AddAttendanceDialogComponent>,
    private _FormBuild: FormBuilder,  
  ) { }

  ngOnInit() {
  }

    get f() { return null; }

    // setFormAttendance(){
    //   this.createAttendance = this._FormBuild.group({
    //     task:['',Validators.required]
    //   })
    // }

    onSave(){
      // console.log(this.createAttendance);
      // let requestInsert = new ReqInsertAttendance();
      // requestInsert.task = this.createAttendance.controls['task'].value;
    }


  canCle(){
    this.dialogRef.close(status);        
  }

}
