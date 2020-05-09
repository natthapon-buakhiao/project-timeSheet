import { Router } from '@angular/router';
import { EditUserProfileDialogComponent } from './edit-user-profile-dialog/edit-user-profile-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {


  submitted = false;


  constructor(
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
  }


  get f() { return null; }

  openDialogEdit(){
    console.log('The dialog was open add');
    const dialogRef = this.dialog.open(EditUserProfileDialogComponent, {
      width: '750px',
      position: {
        top: '10%',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.getCustomer();
        console.log("Edit Success!")
      }
    });

  }

  back(){
    this.router.navigate(['/attendance']);
  }

  
}
