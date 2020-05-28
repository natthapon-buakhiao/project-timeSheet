import { ReqRemoveProject } from './../../shared/model/req-project';
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

  projectList: Project [];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private userProfileService: UserProfileService,
    private reqUserProject: RequestUserProjectService,
    private reqGetAllProject: RequestProjectService,
    private loading: NgxSpinnerService,
    private removeProject: RequestProjectService
    
  ) { }

  ngOnInit() {
    // this.getUserProfile();
    this.getAllProject();

  }

  getAllProject(){
    this.reqGetAllProject.getAllProject().subscribe((res) => {
      console.log(res)
      this.dataUserProject = res.data;
      this.projectList = res.data;  
      console.log(this.dataUserProject)
      console.log(this.projectList)
         
    }, (error) => {
        console.log(error);
    });
  }



  getUserProfile() {
    let request = new RequestInquiryProfile();
    let data: any;
    this.dataProfile = JSON.parse(sessionStorage.getItem('userProfileIam'));
    request.userCode = this.dataProfile.userCode;
    this.userProfileService.inquiryUserProfile(request).subscribe((res) => {
      console.log(res);
      data = res.data[0];
      this.inquiryUserProject(data);
    }, (error) => {
        console.log(error);
    });
    }

    inquiryUserProject(data){
      let request = new RequestInquiryUser();
      request.userCode = data.userCode;
      console.log(request)
      this.reqUserProject.inquiryUser(request).subscribe((res) => {
        console.log(res)   
        this.dataUserProject = res.data[0].id.projectCode;
        console.log(res.data[0].id.projectCode)

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
        this.getAllProject();
      }
    });
  }

  onDeleteSwal(projectList) {
    this.projectList = projectList;
    this.deleteSwal.title = Message.MESSAGE_DELETE;
    this.deleteSwal.fire();
  }

  onDelete() {
    this.loading.show();
    let request = new ReqRemoveProject();
    request.projectCode = this.projectList[0].projectCode;
    request.userCodeSupervisor = this.projectList[0].userCodeSupervisor;
    this.removeProject.deleteProject(request).subscribe((res) => {
      this.loading.hide();
      this.deletedSucessSwal.title = Message.MESSAGE_DELETE_SUCCESS;
      this.deletedSucessSwal.fire();
    }, (error) => {
      this.loading.hide();
    })

  }
  
  goUserProject(data: any){
    this.router.navigateByUrl('/user-project', { state: { data }});
  }
}
