import { RequestAttendanceService } from './../../service/request-attendance.service';
import { MaterialModule } from 'src/app/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceComponent } from './attendance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAttendanceDialogComponent } from './add-attendance-dialog/add-attendance-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [AttendanceComponent, AddAttendanceDialogComponent],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  entryComponents:[AddAttendanceDialogComponent],
  providers: [
    RequestAttendanceService
  ],
})
export class AttendanceModule { }
