import { ReqProfile } from './../../../shared/model/reqLogin';
import { ReqInsertProject } from './../../../shared/model/req-project';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { noWhitespaceValidator } from './../../../shared/noWhitespaceValidator';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Message } from 'src/app/shared/model/message';
import { RequestProjectService } from 'src/app/service/request-project.service';
import { RequestInquiryProfile } from 'src/app/shared/model/req-user-profile';
import { UserProfileService } from 'src/app/service/user-profile.service';




@Component({
  selector: 'app-dialog-assign',
  templateUrl: './dialog-assign.component.html',
  styleUrls: ['./dialog-assign.component.scss']
})
export class DialogAssignComponent implements OnInit {


  createAssignProject: FormGroup
  submitted = false;
  dataSup: any;



  @ViewChild("saveSwal", { static: false }) saveSwal: SwalComponent;
  @ViewChild("saveSucessSwal", { static: false }) saveSucessSwal: SwalComponent;

  constructor(public dialogRef: MatDialogRef<DialogAssignComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _FormBuild: FormBuilder,  
              private loading: NgxSpinnerService,
              private noWhitespaceValidator: noWhitespaceValidator,
              private reqInsertProject: RequestProjectService,
              private userProfileService: UserProfileService, ) { }

  ngOnInit() {
    this.getUserProfile();
    this.createAssignProject = new FormGroup({
      userCodeSupervisor: new FormControl(),
      date: new FormControl(),
      projectName:new FormControl(),
      projectCode:new FormControl(),
      description: new FormControl()
    }); 
  }

  getUserProfile() {
    let request = new RequestInquiryProfile();
    let data: any;
    this.dataSup = JSON.parse(localStorage.getItem('userProfileIam'));
    request.userCode = this.dataSup.userCode;
    this.userProfileService.inquiryUserProfile(request).subscribe((res) => {
      console.log(res);
      data = res.data[0];
      this.setFormProject(data);
    }, (error) => {
        console.log(error);
    }
    );
    }

  get f() { return this.createAssignProject.controls; }

  
  setFormProject(dataSup){
    this.createAssignProject = this._FormBuild.group({
      projectCode:[''],
      userCodeSupervisor:[dataSup.userCode,Validators.required],
      date:['',Validators.required],
      projectName:['',Validators.required, this.noWhitespaceValidator.noWhitespace],
      description:['',Validators.required, this.noWhitespaceValidator.noWhitespace],
    
  
    })    
    console.log(this.createAssignProject)
  }

  onSubmit() {
    this.submitted = true;
    if (this.createAssignProject.invalid) {
      return;
    } else {
      this.saveSwal.title = Message.MESSAGE_SAVE;
      this.saveSwal.fire();
    }
  }

  onSave(){
    console.log(this.createAssignProject);
    let requestInsert = new ReqInsertProject();     
    requestInsert.userCodeSupervisor = this.createAssignProject.controls['userCodeSupervisor'].value;
    requestInsert.date = this.createAssignProject.controls['date'].value;
    requestInsert.projectName = this.createAssignProject.controls['projectName'].value;
    requestInsert.description = this.createAssignProject.controls['description'].value;
    requestInsert.projectCode = this.createAssignProject.controls['projectCode'].value;


    this.reqInsertProject.insetProject(requestInsert).subscribe((res) => {
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
