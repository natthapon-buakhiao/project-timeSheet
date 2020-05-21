import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

interface UserCodeEmployee {
  name: string;
  type: string; 
}


@Component({
  selector: 'app-add-user-project-dialog',
  templateUrl: './add-user-project-dialog.component.html',
  styleUrls: ['./add-user-project-dialog.component.scss']
})
export class AddUserProjectDialogComponent implements OnInit {

  submitted = false;

  userCodeEmployeeControl = new FormControl('', Validators.required);
  userCodeEmployees: UserCodeEmployee[] = [
    {type:'BF',name: 'BF'},
    {type:'DP',name: 'DP'},
    {type:'WD',name: 'WD'},    
  ];

  constructor(public dialogRef: MatDialogRef<AddUserProjectDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, ) { }

  ngOnInit() {
  }

  get f() { return null; }

  
  closeDialog(status) {
    this.dialogRef.close(status);
  }

}
