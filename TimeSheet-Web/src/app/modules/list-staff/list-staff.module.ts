import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListStaffRoutingModule } from './list-staff-routing.module';
import { ListStaffComponent } from './list-staff.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UserProfileService } from 'src/app/service/user-profile.service';


@NgModule({
  declarations: [ListStaffComponent],
  imports: [
    CommonModule,
    ListStaffRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SweetAlert2Module.forRoot(),
    NgxSpinnerModule
  ],
  providers: [
    UserProfileService
  ],
})
export class ListStaffModule { }
