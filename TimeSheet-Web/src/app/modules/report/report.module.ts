import { ReportService } from './../../service/report.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AddReportDialogComponent } from './add-report-dialog/add-report-dialog.component';


@NgModule({
  declarations: [ReportComponent, AddReportDialogComponent, AddReportDialogComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SweetAlert2Module.forRoot(),
  ],
  entryComponents: [
    AddReportDialogComponent
  ],
  providers: [
    ReportService
  ],
})
export class ReportModule { }
