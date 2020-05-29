import { UserService } from './../../service/user.service';
import { RequestUserProjectService } from 'src/app/service/request-user-project.service';
import { AddUserProjectDialogComponent } from './add-user-project-dialog/add-user-project-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { RequestInquiryProject } from 'src/app/shared/model/request-user-project';
import { RequestInquiryProfile } from 'src/app/shared/model/req-user-profile';
import { UserProfileService } from 'src/app/service/user-profile.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-user-project',
  templateUrl: './user-project.component.html',
  styleUrls: ['./user-project.component.scss']
})
export class UserProjectComponent implements OnInit {

  displayedColumns: string[] = ['userCode', 'project', 'task', 'date'];
  dataSource = new MatTableDataSource();
  
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataUserProject: any;
  dataProfile: any;

  constructor(
    public dialog: MatDialog,   
    private reqUserProject: RequestUserProjectService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.dataUserProject = history.state;
    console.log(this.dataUserProject)    
    // this.getUserProject();
    this.inquiryUserProject();
  }


  inquiryUserProject() {
    let request = new RequestInquiryProject();
    request.projectCode = this.dataUserProject.data.projectCode;
    console.log(this.dataUserProject)
    this.reqUserProject.getUserProject(request).subscribe((res) => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res.data); 
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
      (error) => {
        console.log(error + "get Fail!!")
      });
  }

  getUserProject() {
    let request = new RequestInquiryProfile();
    let data: any;
    this.dataProfile = JSON.parse(sessionStorage.getItem('userProfileIam'));
    request.userCode = this.dataProfile.userCode;
    this.userService.inquiryUser(request).subscribe((res) => {
      console.log(res);
      data = res.data[0];
      this.inquiryUserProject();
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
      if (result) {
        this.inquiryUserProject();
      }
    });
  }
}
