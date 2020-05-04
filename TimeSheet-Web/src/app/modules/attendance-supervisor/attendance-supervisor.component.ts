import { Component, OnInit } from '@angular/core';
import { DialogAddAttendanceComponent } from './dialog-add-attendance/dialog-add-attendance.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogAssignComponent } from './dialog-assign/dialog-assign.component';

export interface PeriodicElement {
  date: string;
  project: string;
  site: string;
  task: string;
  timeIn: string;
  timeOut: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {date: '24/4/2020', project: 'timeSheet',
  site: 'krungsri', task: 'frontend', timeIn: '9.00', timeOut: '17.00'},
  {date: '25/4/2020', project: 'timeSheet',
  site: 'krungsri', task: 'backend', timeIn: '9.00', timeOut: '17.00'},
];

@Component({
  selector: 'app-attendance-supervisor',
  templateUrl: './attendance-supervisor.component.html',
  styleUrls: ['./attendance-supervisor.component.scss']
})
export class AttendanceSupervisorComponent implements OnInit {
  displayedColumns: string[] = ['date', 'project',  'site', 'task', 'timeIn', 'timeOut'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  onDialogAddAattendance() {
    console.log('open dialog Add attendance');
    const dialogRef = this.dialog.open(DialogAddAttendanceComponent, {
      width: '600px',
      position: {
        top: '5%'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      // if (result) {
      //   this.getAccount();
      // }
    });
  }

  onDialogAssign() {
    console.log('open dialog Add attendance');
    const dialogRef = this.dialog.open(DialogAssignComponent, {
      width: '800px',
      position: {
        top: '5%'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      // if (result) {
      //   this.getAccount();
      // }
    });
  }

}
