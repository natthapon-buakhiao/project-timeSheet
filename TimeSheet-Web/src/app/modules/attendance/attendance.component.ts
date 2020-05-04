import { RequestAttendanceService } from './../../service/request-attendance.service';
import { ReqInsertAttendance } from './../../shared/model/requestAttendance';
import { AddAttendanceDialogComponent } from './add-attendance-dialog/add-attendance-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  date: string;
  site: string;
  task: string;
  time1: string;
  time2: string;
  project: string;
  
}

const ELEMENT_DATA: PeriodicElement[] = [
{date:'24-04-2563',site:'BAY',task:'frontend',time1:'13.30',time2:'17.30',project:'A'}
];

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  displayedColumns: string[] = ['date', 'site', 'task', 'time1', 'time2', 'project'];
  dataSource = ELEMENT_DATA;

  constructor(
    public dialog: MatDialog,
    private reqAttendance: RequestAttendanceService
  ) { }

  

  ngOnInit() {
    // this.getAttendance();
  }

  // getAttendance(){
  //   this.reqAttendance.getAttendance().subscribe((res) => {
  //     this.dataSource = new MatTableDataSource(res.data);
  //   })
  // }



  openDialogAdd(): void {
    console.log('The dialog was open add');
    const dialogRef = this.dialog.open(AddAttendanceDialogComponent, {
      width: '650px',
      position: {
        top: '10%',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.getCustomer();
        console.log("Add Success!")
      }
    });

  }

}
