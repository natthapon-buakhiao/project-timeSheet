import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProjectRoutingModule } from './user-project-routing.module';
import { UserProjectComponent } from './user-project.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { AddUserProjectDialogComponent } from './add-user-project-dialog/add-user-project-dialog.component';


@NgModule({
  declarations: [UserProjectComponent,AddUserProjectDialogComponent],
  imports: [
    CommonModule,
    UserProjectRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,

  ],
  entryComponents: [    
        AddUserProjectDialogComponent
    ],
})
export class UserProjectModule { }