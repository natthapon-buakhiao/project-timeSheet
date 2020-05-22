import { RequestUserProjectService } from 'src/app/service/request-user-project.service';
import { AddUserProjectDialogComponent } from './add-user-project-dialog/add-user-project-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { RequestInquiryProject } from 'src/app/shared/model/request-user-project';
import { RequestInquiryProfile } from 'src/app/shared/model/req-user-profile';
import { UserProfileService } from 'src/app/service/user-profile.service';

@Component({
  selector: 'app-user-project',
  templateUrl: './user-project.component.html',
  styleUrls: ['./user-project.component.scss']
})
export class UserProjectComponent implements OnInit {

  displayedColumns: string[] = ['userCode', 'project', 'task', 'date'];
  dataSource = new MatTableDataSource();

  dataProfile: any;

  constructor(
    public dialog: MatDialog,   
    private reqUserProject: RequestUserProjectService,
    private userProfileService: UserProfileService
  ) { }

  ngOnInit() {
    // this.getUserProject();
    this.inquiryUserProject();
  }


  inquiryUserProject() {
    let request = new RequestInquiryProject();
    request.projectCode = "6";
    this.reqUserProject.getUserProject(request).subscribe((res) => {
      console.log(res.data)
      this.dataSource = new MatTableDataSource(res.data); 
      // this.dataSource.sort = this.sort;
      // this.dataSource.paginator = this.paginator;
    },
      (error) => {
        console.log(error + "get Fail!!")
      }
    )

  }

  getUserProject() {
    let request = new RequestInquiryProfile();
    let data: any;
    this.dataProfile = JSON.parse(localStorage.getItem('userProfileIam'));
    request.userCode = this.dataProfile.userCode;
    this.userProfileService.inquiryUserProfile(request).subscribe((res) => {
      console.log(res);
      data = res.data[0];
      // this.inquiryUserProject(data);
    }, (error) => {
      console.log(error);
    });
  }


  openDialogAddUser() {
    console.log('open dialog Add attendance');
    const dialogRef = this.dialog.open(AddUserProjectDialogComponent, {
      width: '750px',
      position: {
        top: '15%'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      // if (result) {
      //   this.getAccount();
      // }
    });
  }
}
