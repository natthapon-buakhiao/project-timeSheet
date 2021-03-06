import { ReportService } from './../../service/report.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { RequestInquiryReport } from 'src/app/shared/model/report';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-staff',
  templateUrl: './list-staff.component.html',
  styleUrls: ['./list-staff.component.scss']
})
export class ListStaffComponent implements OnInit {
  displayedColumns: string[] = ['userCode', 'firstName', 'lastName', 'action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataProfile: any;
  report: any;

  constructor(
    private reqStaff: ReportService,
    private router: Router,
    private loading: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.report = history.state;
    console.log(this.report.data.siteCode)
    this.loading.show();
    setTimeout(() => {
      this.loading.hide();
    }, 500);
    this.inquiryStaff()
  }

  inquiryStaff() {
    let request = new RequestInquiryReport();
    this.dataProfile = JSON.parse(sessionStorage.getItem('userProfileIam'));
    request.lineManager = this.dataProfile.userCode;
    request.siteCode = this.report.data.siteCode;
    console.log(request)
    this.reqStaff.inquiryReport(request).subscribe((res) => {
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

  goAttendance(data){
    this.router.navigateByUrl('/attendance', { state: { data } });
  }

}
