import { UserService } from './../../service/user.service';
import { ReqRemoveProject, RequestInquirySup } from './../../shared/model/req-project';
import { UserProfileService } from './../../service/user-profile.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogAssignComponent } from './dialog-assign/dialog-assign.component';
import { MatDialog } from '@angular/material/dialog';
import { RequestInquiryProfile } from 'src/app/shared/model/req-user-profile';
import { RequestInquiryUser } from 'src/app/shared/model/request-user-project';
import { RequestUserProjectService } from 'src/app/service/request-user-project.service';
import { RequestProjectService } from 'src/app/service/request-project.service';
import { Project } from 'src/app/shared/model/project';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Message } from 'src/app/shared/model/message';
import { EditProjectDialogComponent } from './edit-project-dialog/edit-project-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild("deleteSwal", { static: false }) deleteSwal: SwalComponent;
  @ViewChild("deletedSucessSwal", { static: false }) deletedSucessSwal: SwalComponent;

  dataProfile: any;
  dataUserProject: any;
  isSup: boolean = true;
  projectList: Project[];

  constructor(
    private router: Router,
    public dialog: MatDialog,   
    private reqUserProject: RequestUserProjectService,  
    private loading: NgxSpinnerService,
    private removeProject: RequestProjectService,
    private reqSupProject: RequestProjectService

  ) { }

  ngOnInit() {   
    this.loading.show();
    setTimeout(() => {      
      this.loading.hide();
    }, 1000);

    this.dataProfile = JSON.parse(sessionStorage.getItem('userProfileIam'));
    if (this.dataProfile.userRoleObjects[0].roleCode == 'SUPERVISOR') {
      this.isSup = true;
      this.inquirySup();

    } else {
      this.isSup = false;
      this.inquiryUserProject();
    }

  }

  inquirySup() {
    let request = new RequestInquirySup();   
    request.userCodeSupervisor = this.dataProfile.userCode;
    // console.log(request)
    this.reqSupProject.inquirySup(request).subscribe((res) => {
      // console.log(res)
      this.dataUserProject = res.data;
      this.projectList = res.data;
    },
      (error) => {
        console.log(error + "get Fail!!")
      })
  }

  inquiryUserProject() {
    let request = new RequestInquiryUser();
    request.userCode = this.dataProfile.userCode;
    console.log(request)
    this.reqUserProject.inquiryUserProject(request).subscribe((res) => {
      console.log(res)
      this.dataUserProject = res.data;
      this.projectList = res.data;

    },
      (error) => {
        console.log(error + "get Fail!!")
      })
  }

  onDialogAssign() {
    console.log('open dialog Assign Project');
    const dialogRef = this.dialog.open(DialogAssignComponent, {
      width: '750px',
      position: {
        top: '15%'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.inquirySup();
      }
    });
  }

  openDialogEdit(projectList) {
    console.log('The dialog was open edit');
    const dialogRef = this.dialog.open(EditProjectDialogComponent, {
      width: '750px',
      position: {
        top: '10%'
      },
      data: { dataedit: projectList }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.inquirySup();
        console.log("Edit Success!")
      }
    });
  }

  onDeleteSwal(dataUserProject) {
    this.dataUserProject = dataUserProject;
    this.deleteSwal.title = Message.MESSAGE_DELETE;
    this.deleteSwal.fire();
  }

  onDelete() {    
    let request = new ReqRemoveProject();
    request.projectCode = this.dataUserProject.projectCode;
    request.userCodeSupervisor = this.dataUserProject.userCodeSupervisor;
    this.removeProject.deleteProject(request).subscribe((res) => {      
      this.deletedSucessSwal.title = Message.MESSAGE_DELETE_SUCCESS;
      this.deletedSucessSwal.fire();
      this.loading.show();
      setTimeout(() => {      
        this.loading.hide();
      }, 1000);
    }, (error) => {
      this.loading.show();
      setTimeout(() => {      
        this.loading.hide();
      }, 1000);
    })

  }

  goUserProject(data: any) {
    this.router.navigateByUrl('/user-project', { state: { data } });
  }
}
