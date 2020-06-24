import { ExportService } from './../../service/export.service';
import { UserService } from './../../service/user.service';
import { RequestInquiryUser } from './../../shared/model/request-user-project';
import { RequestInquiryAttendace,Excel, ReqRemoveAttendance } from './../../shared/model/requestAttendance';
import { RequestAttendanceService } from './../../service/request-attendance.service';
import { AddAttendanceDialogComponent } from './add-attendance-dialog/add-attendance-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDatepicker, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { FormControl } from '@angular/forms';
import { EditAttendanceDialogComponent } from './edit-attendance-dialog/edit-attendance-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Message } from 'src/app/shared/model/message';
import { RequestUserProjectService } from 'src/app/service/request-user-project.service';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  displayedColumns: string[] = ['date', 'project', 'task', 'site', 'timeIn', 'timeOut', 'action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild("deleteSwal", { static: false }) deleteSwal: SwalComponent;
  @ViewChild("deletedSucessSwal", { static: false }) deletedSucessSwal: SwalComponent;

  dataProfile: any;
  dataStaff: any;
  isSup: boolean = true;  
  arraydataSource: any = [];
  groupData: any;
  private dataExcel: Array<any> = []; 
  private excel: Excel = new Excel(); 
  dateTest = new FormControl(moment());
  idAttendance: any;
  dataSite: any;
  project: any;


  constructor(
    public dialog: MatDialog,
    private reqAttendance: RequestAttendanceService,    
    private exportService: ExportService,
    private loading: NgxSpinnerService,
    private removeAttendances: RequestAttendanceService,
    private reqUserProject: RequestUserProjectService
  ) { 
    this.groupData = this.organise(this.dataExcel);
  }

  ngOnInit() {
    this.loading.show();
    setTimeout(() => {      
      this.loading.hide();
    }, 500);

    this.dataStaff = history.state;  
    this.dataProfile = JSON.parse(sessionStorage.getItem('userProfileIam'));
    if (this.dataProfile.userRoleObjects[0].roleCode == 'SUPERVISOR') {
      this.isSup = true;
      this.inquiryListStaff();
    } else {
      this.isSup = false;
      this.inquiryAttendance();
    }

    this.getAllSite();
    this.inquiryUserProject();
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.dateTest.value;
    ctrlValue.year(normalizedYear.year());
    this.dateTest.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.dateTest.value;
    ctrlValue.month(normalizedMonth.month());
    this.dateTest.setValue(ctrlValue);
    datepicker.close();
  }

  exportAsXLSX():void {
    this.exportService.exportExcel(this.dataExcel, 'Attendance List')
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

  inquiryAttendance() {
    let request = new RequestInquiryAttendace();
    this.dataProfile = JSON.parse(sessionStorage.getItem('userProfileIam'));
    request.userCode = this.dataProfile.userCode;
    request.date = this.dataProfile.date;    
    request.date = this.dateTest.value._d;
    console.log(request)
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

  inquiryListStaff() {
    this.loading.show();
      setTimeout(() => {      
        this.loading.hide();
      }, 500);
    this.dataExcel = []; 
    let request = new RequestInquiryAttendace();
    request.userCode = this.dataStaff.data;
    request.date = this.dateTest.value._d;
    console.log(request);
    this.reqAttendance.inquiryAttendance(request).subscribe((res) => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.arraydataSource = this.dataSource.data;
      console.log(this.arraydataSource)

      // SETTING OBJECT EXCEL
      this.arraydataSource.forEach((data) => {

        this.excel = new Excel();

        this.excel.id = data.id
        this.excel.date = data.date
        this.excel.project = data.project.projectName
        this.excel.site = data.site.site
        this.excel.task = data.task
        this.excel.timeIn = data.timeIn
        this.excel.timeOut = data.timeOut
        this.excel.user = data.user.userCode

        this.dataExcel.push(this.excel);
      
      })
    },
      (error) => {
        console.log(error + "get Fail!!")
      })
  }

  
  inquiryUserProject() {
    const request = new RequestInquiryUser();
    this.dataProfile = JSON.parse(sessionStorage.getItem('userProfileIam'));
    request.userCode = this.dataProfile.userCode;
    console.log(request);
    this.reqUserProject.inquiryUserProject(request).subscribe((res) => {
      console.log(res);
      this.project = res.data;
      localStorage.setItem('project', JSON.stringify(this.project));   
      // console.log(this.project)
    },
      (error) => {
        console.log(error + 'get Fail!!');
      });
  }

  getAllSite() {
    this.reqAttendance.getAllSite().subscribe((res) => {
      console.log(res);
      this.dataSite = res.data;
      localStorage.setItem('dataSite', JSON.stringify(this.dataSite));    
    },
      (error) => {
        console.log(error + 'get Fail!!');
      });
  }
  





  onDeleteSwal(idAttendance) {    
    this.idAttendance = idAttendance;
    this.deleteSwal.title = Message.MESSAGE_DELETE;
    this.deleteSwal.fire();
  }

  onDelete() {
    let request = new ReqRemoveAttendance();
    request.id = this.idAttendance.id;
    console.log(request)
    this.removeAttendances.removeAttendance(request).subscribe((res) => {
      this.deletedSucessSwal.title = Message.MESSAGE_DELETE_SUCCESS;
      this.deletedSucessSwal.fire();
    }, (error) => {
      console.log(error)
    })

  }

  deletedSucess() {
    this.loading.show();
    setTimeout(() => {
      this.loading.hide();
    }, 500);
    this.inquiryAttendance();
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
        this.inquiryAttendance();
        console.log("Add Success!")
      }
    });

  }

  openDialogEdit(dataAttendance) {
    console.log('The dialog was open edit');
    const dialogRef = this.dialog.open(EditAttendanceDialogComponent, {
      width: '750px',
      data: dataAttendance,
      position: {
        top: '10%',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.inquiryAttendance();
        console.log("Edit Success!")
      }
    });

  }

}
