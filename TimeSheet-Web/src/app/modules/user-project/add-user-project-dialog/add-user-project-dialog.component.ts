import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user-project-dialog',
  templateUrl: './add-user-project-dialog.component.html',
  styleUrls: ['./add-user-project-dialog.component.scss']
})
export class AddUserProjectDialogComponent implements OnInit {

  submitted = false;

  constructor(public dialogRef: MatDialogRef<AddUserProjectDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, ) { }

  ngOnInit() {
  }

  get f() { return null; }

  
  closeDialog(status) {
    this.dialogRef.close(status);
  }

}
