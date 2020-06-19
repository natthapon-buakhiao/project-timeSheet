import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProjectRoutingModule } from './user-project-routing.module';
import { UserProjectComponent } from './user-project.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { AddUserProjectDialogComponent } from './add-user-project-dialog/add-user-project-dialog.component';
import { RequestUserProjectService } from 'src/app/service/request-user-project.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/common/date.adapter';


@NgModule({
  declarations: [UserProjectComponent,AddUserProjectDialogComponent],
  imports: [
    CommonModule,
    UserProjectRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SweetAlert2Module.forRoot(),

  ],
  entryComponents: [    
        AddUserProjectDialogComponent
    ],
    providers: [
      RequestUserProjectService,
      {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ],
})
export class UserProjectModule { }
