import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user-profile-dialog',
  templateUrl: './edit-user-profile-dialog.component.html',
  styleUrls: ['./edit-user-profile-dialog.component.scss']
})
export class EditUserProfileDialogComponent implements OnInit {

  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<EditUserProfileDialogComponent>,
  ) { }

  ngOnInit() {
  }

  get f() { return null; }

  canCle(){
    this.dialogRef.close(status);        
  }


}
