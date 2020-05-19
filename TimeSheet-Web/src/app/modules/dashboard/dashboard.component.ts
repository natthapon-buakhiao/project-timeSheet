import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DialogAssignComponent } from './dialog-assign/dialog-assign.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  

  constructor(
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  onDialogAssign() {
    console.log('open dialog Assign Project');
    const dialogRef = this.dialog.open(DialogAssignComponent, {
      width: '750px',
      position: {
        top: '15%'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      // if (result) {
      //   this.getAccount();
      // }
    });
  }

  logout(){
    this.router.navigate(['/login']);
    sessionStorage.clear();
  }

  goUserProject(){
    this.router.navigate(['/user-project']);
  }

  goAttendance(){
    this.router.navigate(['/attendance']);
  }

  goSupervisor(){
    this.router.navigate(['/supervisor']);
  }


}
