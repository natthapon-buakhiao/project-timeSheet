import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-assign',
  templateUrl: './dialog-assign.component.html',
  styleUrls: ['./dialog-assign.component.scss']
})
export class DialogAssignComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogAssignComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, ) { }

  ngOnInit() {
  }
  closeDialog(status) {
    this.dialogRef.close(status);
  }

}
