import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Message } from 'src/app/shared/model/message';
import { ReqEditProject } from 'src/app/shared/model/req-project';
import { RequestProjectService } from 'src/app/service/request-project.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/common/date.adapter';

@Component({
  selector: 'app-edit-project-dialog',
  templateUrl: './edit-project-dialog.component.html',
  styleUrls: ['./edit-project-dialog.component.scss'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class EditProjectDialogComponent implements OnInit {

  @ViewChild("saveSwal", { static: false }) saveSwal: SwalComponent;
  @ViewChild("saveSucessSwal", { static: false }) saveSucessSwal: SwalComponent;

  editProject: FormGroup
  submitted = false;
  constructor(    
    public dialogRef: MatDialogRef<EditProjectDialogComponent>,   
    private _FormBuild: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loading: NgxSpinnerService,
    private requestProject: RequestProjectService,

     ) { }

  ngOnInit() {
    // console.log(this.data);
    this.setFormProject(this.data);
  }


  get f() { return this.editProject.controls; }

  setFormProject(dataProject) {
    this.editProject = this._FormBuild.group({
      projectCode: [dataProject.dataedit.projectCode, Validators.required],
      projectName: [dataProject.dataedit.projectName, Validators.required],
      description: [dataProject.dataedit.description, Validators.required],
      userCodeSupervisor: [dataProject.dataedit.userCodeSupervisor, Validators.required]
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.editProject.invalid) {
      return;
    } else {
      this.saveSwal.title = Message.MESSAGE_SAVE;
      this.saveSwal.fire();
    }
  }

  onSave() {
    this.loading.show();
    let reqEditProject = new ReqEditProject();
    reqEditProject.projectCode = this.editProject.controls['projectCode'].value;
    reqEditProject.projectName = this.editProject.controls['projectName'].value;    
    reqEditProject.description = this.editProject.controls['description'].value;
    reqEditProject.userCodeSupervisor = this.editProject.controls['userCodeSupervisor'].value;
    this.requestProject.editProject(reqEditProject).subscribe((res) => {
      console.log("edit Project Success");
      this.loading.hide();
      this.saveSucessSwal.title = Message.MESSAGE_SAVE_SUCCESS;
      this.saveSucessSwal.fire();
    },
      (error) => {
       this.loading.hide();
        console.log(error); 
      });   
  }

  canCle(status){
    this.dialogRef.close(status);    
  }

}
