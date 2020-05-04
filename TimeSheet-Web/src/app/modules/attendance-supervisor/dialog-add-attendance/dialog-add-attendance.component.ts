import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-attendance',
  templateUrl: './dialog-add-attendance.component.html',
  styleUrls: ['./dialog-add-attendance.component.scss']
})
export class DialogAddAttendanceComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogAddAttendanceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, ) { }

  ngOnInit() {
  }
  closeDialog(status) {
    this.dialogRef.close(status);
  }

}
