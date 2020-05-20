import { AddUserProjectDialogComponent } from './add-user-project-dialog/add-user-project-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-project',
  templateUrl: './user-project.component.html',
  styleUrls: ['./user-project.component.scss']
})
export class UserProjectComponent implements OnInit {

  displayedColumns: string[] = ['userCode','date', 'project', 'task','userCodeSup'];
  dataSource = new MatTableDataSource();

  constructor(
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit() {
  }


  openDialogAddUser() {
    console.log('open dialog Add attendance');
    const dialogRef = this.dialog.open(AddUserProjectDialogComponent, {
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

  back(){
    this.router.navigate(['/dashboard']);
  }

}
