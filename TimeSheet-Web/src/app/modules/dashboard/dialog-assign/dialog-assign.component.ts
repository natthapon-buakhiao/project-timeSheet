import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-assign',
  templateUrl: './dialog-assign.component.html',
  styleUrls: ['./dialog-assign.component.scss']
})
export class DialogAssignComponent implements OnInit {

  submitted = false;

  constructor(public dialogRef: MatDialogRef<DialogAssignComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, ) { }

  ngOnInit() {
  }

  get f() { return null; }

  
  closeDialog(status) {
    this.dialogRef.close(status);
  }

}
