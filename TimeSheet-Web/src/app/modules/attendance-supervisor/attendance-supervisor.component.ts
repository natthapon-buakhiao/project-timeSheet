import { Router } from '@angular/router';
import { AddAttendanceDialogComponent } from './../attendance/add-attendance-dialog/add-attendance-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAssignComponent } from '../dashboard/dialog-assign/dialog-assign.component';
import { RequestAttendanceService } from 'src/app/service/request-attendance.service';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-attendance-supervisor',
  templateUrl: './attendance-supervisor.component.html',
  styleUrls: ['./attendance-supervisor.component.scss']
})
export class AttendanceSupervisorComponent implements OnInit {
  displayedColumns: string[] = ['date', 'project', 'task', 'site', 'timeIn', 'timeOut'];
  dataSource = new MatTableDataSource();

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private reqAttendance: RequestAttendanceService
    ) { }

  ngOnInit() {
    this.getAttendance();
  }

  getAttendance() {
    this.reqAttendance.getAttendance().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.data);
      console.log(res);
      // this.dataSource.sort = this.sort;
      // this.dataSource.paginator = this.paginator;
      console.log('getAttendance Success');
    },
      (error) => {
        console.log(error);

      }
    );

  }
  onDialogAddAattendance() {
    console.log('open dialog Add attendance');
    const dialogRef = this.dialog.open(AddAttendanceDialogComponent, {
      width: '750px',
      position: {
        top: '10%'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      // if (result) {
      //   this.getAccount();
      // }
      this.getAttendance();
    });
  }



  back(){
    this.router.navigate(['/dashboard']);
  }

}
