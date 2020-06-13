import { UserService } from './../../service/user.service';
import { ReportService } from './../../service/report.service';
import { AddReportDialogComponent } from './add-report-dialog/add-report-dialog.component';
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
    this.inquiryReport();
    
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


  inquiryReport() {
    let request = new RequestInquiryReport();
    this.dataProfile = JSON.parse(sessionStorage.getItem('userProfileIam'));
    request.userCode = this.dataProfile.userCode;
    this.reqReport.inquiryReport(request).subscribe((res) => {
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

  openDialogAdd(): void {
    console.log('The dialog was open add');
    const dialogRef = this.dialog.open(AddReportDialogComponent, {
      width: '850px',
      position: {
        top: '10%',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.inquiryReport();
        console.log("Add Success!")
      }
    });

  }

  goViewStaff() {
    this.router.navigateByUrl('/list-staff');
  }

}
