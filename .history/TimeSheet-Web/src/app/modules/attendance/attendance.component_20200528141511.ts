import { UserService } from './../../service/user.service';
import { RequestInquiryUser } from './../../shared/model/request-user-project';
import { RequestInquiryAttendace } from './../../shared/model/requestAttendance';
import { Router } from '@angular/router';
import { RequestAttendanceService } from './../../service/request-attendance.service';
import { AddAttendanceDialogComponent } from './add-attendance-dialog/add-attendance-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UserProfileService } from 'src/app/service/user-profile.service';
import { RequestInquiryProfile } from 'src/app/shared/model/req-user-profile';
import { RequestProjectService } from 'src/app/service/request-project.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  displayedColumns: string[] = ['date', 'project', 'task', 'site', 'timeIn', 'timeOut'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataProfile: any;
  project: any;

  constructor(
    public dialog: MatDialog,
    private reqAttendance: RequestAttendanceService,
    private router: Router,
    private userProfileService: UserProfileService,
    private userService: UserService,
    private projectService: RequestProjectService
  ) { }



  ngOnInit() {
    this.reqUserProject.getUserProject(request).subscribe((res) => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res.data); 
      // this.dataSource.sort = this.sort;
      // this.dataSource.paginator = this.paginator;
    },
      (error) => {
        console.log(error + "get Fail!!")
      });
    this.getUser();
  }

  inquiryAttendance(data) {
    let request = new RequestInquiryAttendace();
    request.userCode = data.userCode;
    this.reqAttendance.inquiryAttendance(request).subscribe((res) => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res.data); 
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
      (error) => {
        console.log(error + "get Fail!!")
      }
    )

  }

  getUser() {
    let request = new RequestInquiryUser();
    let data: any;
    this.dataProfile = JSON.parse(sessionStorage.getItem('userProfileIam'));
    request.userCode = this.dataProfile.userCode;
    this.userService.inquiryUser(request).subscribe((res) => {
      console.log(res);
      data = res.data[0];
      this.inquiryAttendance(data);
    }, (error) => {
      console.log(error);
    });
  }


  openDialogAdd(): void {
    console.log('The dialog was open add');
    const dialogRef = this.dialog.open(AddAttendanceDialogComponent, {
      width: '750px',
      position: {
        top: '10%',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getUser();
        console.log("Add Success!")
      }
    });

  }

}
