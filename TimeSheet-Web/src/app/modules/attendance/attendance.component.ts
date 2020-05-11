import { Router } from '@angular/router';
import { RequestAttendanceService } from './../../service/request-attendance.service';
import { AddAttendanceDialogComponent } from './add-attendance-dialog/add-attendance-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  displayedColumns: string[] = ['date', 'project', 'task', 'site', 'timeIn', 'timeOut'];
  dataSource = new MatTableDataSource();


  constructor(
    public dialog: MatDialog,
    private reqAttendance: RequestAttendanceService,
    private router: Router
  ) { }

  

  ngOnInit() {
    this.getAttendance();
  }

  getAttendance() {
    this.reqAttendance.getAttendance().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.data);
      // this.dataSource.sort = this.sort;
      // this.dataSource.paginator = this.paginator;
      console.log('getAttendance Success');
    },
      (error) => {

      }
    )

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
        // this.getCustomer();
        console.log("Add Success!")
      }
    });

  }

  back(){
    this.router.navigate(['/dashboard']);
  }

}
