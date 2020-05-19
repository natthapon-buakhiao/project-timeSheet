import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { noWhitespaceValidator } from './../../../shared/noWhitespaceValidator';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Message } from 'src/app/shared/model/message';

@Component({
  selector: 'app-dialog-assign',
  templateUrl: './dialog-assign.component.html',
  styleUrls: ['./dialog-assign.component.scss']
})
export class DialogAssignComponent implements OnInit {


  createAssign: FormGroup
  submitted = false;

  @ViewChild("saveSwal", { static: false }) saveSwal: SwalComponent;
  @ViewChild("saveSucessSwal", { static: false }) saveSucessSwal: SwalComponent;

  constructor(public dialogRef: MatDialogRef<DialogAssignComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _FormBuild: FormBuilder,  
              private loading: NgxSpinnerService,
              private noWhitespaceValidator: noWhitespaceValidator, ) { }

  ngOnInit() {

    this.createAssign = new FormGroup({
      userCode: new FormControl(),
      date: new FormControl(),
      project:new FormControl(),
      description: new FormControl()
    }); 
  }

  get f() { return this.createAssign.controls; }

  
  setFormAttendance(dataUser){
    this.createAssign = this._FormBuild.group({
      userCode:[dataUser.userCode,Validators.required],
      date:['',Validators.required],
      project:['',Validators.required, this.noWhitespaceValidator.noWhitespace],
      description:['',Validators.required, this.noWhitespaceValidator.noWhitespace],
  
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.createAssign.invalid) {
      return;
    } else {
      this.saveSwal.title = Message.MESSAGE_SAVE;
      this.saveSwal.fire();
    }
  }

  onSave(){
    console.log(this.createAssign);
    // let requestInsert = new ReqInsertAttendance();     
    // requestInsert.userCode = this.createAssign.controls['userCode'].value;
    // requestInsert.date = this.createAssign.controls['date'].value;
    // requestInsert.project = this.createAssign.controls['project'].value;
    // requestInsert.description = this.createAssign.controls['description'].value;


    // this.requestAttendance.insetAttendance(requestInsert).subscribe((res) => {
    //   this.loading.hide();
    //   this.saveSucessSwal.title = Message.MESSAGE_SAVE_SUCCESS;
    //   this.saveSucessSwal.fire(); 
    //   console.log(res)    
    // }, (error) => {
    //   this.loading.hide();
    //   console.log(error);
    // });
  }


canCle(status){
  this.dialogRef.close(status);        
}

  


}
