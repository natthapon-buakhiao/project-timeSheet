import { UserService } from './../../service/user.service';
import { ReportService } from './../../service/report.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { RequestInquiryReport } from 'src/app/shared/model/report';
import { RequestInquiryUser } from 'src/app/shared/model/user';
import { RequestAttendanceService } from 'src/app/service/request-attendance.service';
import { DataSite } from 'src/app/shared/model/requestAttendance';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  displayedColumns: string[] = ['userCode', 'startDate', 'endDate', 'totalHours', 'task', 'feedBack', 'goal'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataProfile: any;
  dataSite: DataSite[];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private reqReport: ReportService,
    private requestAttendance: RequestAttendanceService

  ) { }

  ngOnInit() {
    this.getAllSite();    
  }

  getAllSite(){
    this.requestAttendance.getAllSite().subscribe((res) => {
      console.log(res)
      this.dataSite = res.data;     
      console.log(this.dataSite)
    },
      (error) => {
        console.log(error + "get Fail!!")
      });
  }

  goViewStaff(data: any) {
    this.router.navigateByUrl('/list-staff', { state: { data } });    
  }

}
