import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { RequestUserProjectService } from 'src/app/service/request-user-project.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserProfileService } from 'src/app/service/user-profile.service';
import { noWhitespaceValidator } from './../../../shared/noWhitespaceValidator';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Message } from 'src/app/shared/model/message';
import { ReqInsertUserProject } from 'src/app/shared/model/request-user-project';
import { UserService } from 'src/app/service/user.service';
import { RequestProjectService } from 'src/app/service/request-project.service';

@Component({
  selector: 'app-add-user-project-dialog',
  templateUrl: './add-user-project-dialog.component.html',
  styleUrls: ['./add-user-project-dialog.component.scss']
})
export class AddUserProjectDialogComponent implements OnInit {


  createUserProject: FormGroup;
  submitted = false;
  dataUserProject: any;
  dataUserProjectCode: any;

  @ViewChild("saveSwal", { static: false }) saveSwal: SwalComponent;
  @ViewChild("saveSucessSwal", { static: false }) saveSucessSwal: SwalComponent;


  constructor(public dialogRef: MatDialogRef<AddUserProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _FormBuild: FormBuilder,
    private loading: NgxSpinnerService,
    private noWhitespaceValidator: noWhitespaceValidator,
    private reqInsertUserProject: RequestUserProjectService,
    private userService: UserService,
    private projectService: RequestProjectService ) { }

  ngOnInit() {
    this.getAllUser();
    this.getAllProject();


    this.createUserProject = new FormGroup({
      userCode: new FormControl(),
      date: new FormControl(),
      projectCode: new FormControl(),
      task: new FormControl()
    });
  }

  getAllUser() {
    this.dataUserProject = JSON.parse(sessionStorage.getItem('userProfileIam'));
    this.userService.getAllUser().subscribe((res) => {
      console.log(res)
      this.setFormUserProject();
      this.dataUserProject = res.data;
      console.log(this.dataUserProject)
    }, (error) => {
      console.log(error);
    });
  }

  getAllProject(){
    this.projectService.getAllProject().subscribe((res) => {
      console.log(res)
      this.dataUserProjectCode = res.data;
    },
      (error) => {
        console.log(error + "get Fail!!")
      });
  }

  get f() { return this.createUserProject.controls; }

  setFormUserProject() {
    this.createUserProject = this._FormBuild.group({
      userCode: ['', Validators.required, this.noWhitespaceValidator.noWhitespace],
      date: ['', Validators.required],
      projectCode: ['', Validators.required, this.noWhitespaceValidator.noWhitespace],
      task: ['', Validators.required, this.noWhitespaceValidator.noWhitespace],

    });
    console.log(this.createUserProject)
  }

  onSubmit() {
    this.submitted = true;
    if (this.createUserProject.invalid) {
      return;
    } else {
      this.saveSwal.title = Message.MESSAGE_SAVE;
      this.saveSwal.fire();
    }
  }

  onSave() {
    console.log(this.createUserProject);
    let requestInsert = new ReqInsertUserProject();
    requestInsert.userCode = this.createUserProject.controls['userCode'].value;
    requestInsert.date = this.createUserProject.controls['date'].value;
    requestInsert.projectCode = this.createUserProject.controls['projectCode'].value;
    requestInsert.task = this.createUserProject.controls['task'].value;


    this.reqInsertUserProject.insetUserProject(requestInsert).subscribe((res) => {
      this.loading.hide();
      this.saveSucessSwal.title = Message.MESSAGE_SAVE_SUCCESS;
      this.saveSucessSwal.fire();
      console.log(res)
    }, (error) => {
      this.loading.hide();
      console.log(error);
    });
  }


  closeDialog(status) {
    this.dialogRef.close(status);
  }

}
