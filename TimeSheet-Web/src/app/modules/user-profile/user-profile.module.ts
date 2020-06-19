import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserProfileComponent } from './user-profile.component';
import { EditUserProfileDialogComponent } from './edit-user-profile-dialog/edit-user-profile-dialog.component';
import { UserProfileService } from 'src/app/service/user-profile.service';
import { RequestProfileService } from 'src/app/service/request-profile.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/common/date.adapter';


@NgModule({
  declarations: [UserProfileComponent,EditUserProfileDialogComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SweetAlert2Module.forRoot()
    
  ],
  entryComponents:[EditUserProfileDialogComponent],
  providers: [
    RequestProfileService,
    UserProfileService,
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    
  ],
})
export class UserProfileModule { }
