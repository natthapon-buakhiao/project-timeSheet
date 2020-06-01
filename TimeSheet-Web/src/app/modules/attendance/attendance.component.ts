import { ExportService } from './../../service/export.service';
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
  dataStaff: any;
  isSup: boolean = true;  
  arraydataSource: any = [];
  groupData: any;

  constructor(
    public dialog: MatDialog,
    private reqAttendance: RequestAttendanceService,
    private userService: UserService,
    private exportService: ExportService,
  ) { 
    this.groupData = this.organise(this.arraydataSource);
  }

  ngOnInit() {
    this.dataStaff = history.state;
    // console.log(this.dataStaff.data)
    this.dataProfile = JSON.parse(sessionStorage.getItem('userProfileIam'));
    if (this.dataProfile.userRoleObjects[0].roleCode && 'SUPERVISOR' == this.dataProfile.userRoleObjects[0].roleCode) {
      this.isSup = true;
      this.inquiryListStaff(this.dataStaff.data);

    } else {
      this.isSup = false;
      this.getUser();
    }
  }

  exportAsXLSX():void {
    this.exportService.exportExcel(this.arraydataSource, 'Attendance List')
  }

  organise(arr) {
    var headers = [], // an Array to let us lookup indicies by group
      objs = [],    // the Object we want to create
      i, j;
    for (i = 0; i < arr.length; ++i) {
      j = headers.indexOf(arr[i].id); // lookup
      if (j === -1) { // this entry does not exist yet, init
        j = headers.length;
        headers[j] = arr[i].id;
        objs[j] = {};
        objs[j].id = arr[i].id;
        objs[j].data = [];
      }
      objs[j].data.push( // create clone
        {
          case_worked: arr[i].case_worked,
          note: arr[i].note, id: arr[i].id
        }
      );
    }
    return objs;
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
      })
  }

  inquiryListStaff(data) {
    let request = new RequestInquiryAttendace();
    request.userCode = data;
    this.reqAttendance.inquiryAttendance(request).subscribe((res) => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.arraydataSource = this.dataSource.data;
      
      console.log('===arraydataSource', JSON.stringify(this.arraydataSource))
    },
      (error) => {
        console.log(error + "get Fail!!")
      })
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
