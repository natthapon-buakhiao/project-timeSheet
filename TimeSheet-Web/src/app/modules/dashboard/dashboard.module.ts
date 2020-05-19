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


@NgModule({
  declarations: [DashboardComponent,DialogAssignComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SweetAlert2Module.forRoot()
  ],
  entryComponents: [    
    DialogAssignComponent    
    ],
})
export class DashboardModule { }
