import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UserProfileComponent } from './../user-profile/user-profile.component';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogAssignComponent } from './dialog-assign/dialog-assign.component';
import { EditProjectDialogComponent } from './edit-project-dialog/edit-project-dialog.component';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/common/date.adapter';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [DashboardComponent,DialogAssignComponent, EditProjectDialogComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SweetAlert2Module.forRoot(),
    NgxSpinnerModule
  ],
  entryComponents: [    
    DialogAssignComponent, EditProjectDialogComponent
    ],  
    providers: [
      {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ],
})
export class DashboardModule { }
