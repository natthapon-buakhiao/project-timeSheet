import { ExportDirective } from './../../_directive/export.service';
import { RequestAttendanceService } from './../../service/request-attendance.service';
import { MaterialModule } from 'src/app/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceComponent } from './attendance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { EditAttendanceDialogComponent } from './edit-attendance-dialog/edit-attendance-dialog.component';





@NgModule({
  declarations: [AttendanceComponent,ExportDirective, EditAttendanceDialogComponent],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SweetAlert2Module.forRoot(),    
    
  ],
  entryComponents:[EditAttendanceDialogComponent],
  providers: [
    RequestAttendanceService,
    ExportDirective
  ],
})
export class AttendanceModule { }
