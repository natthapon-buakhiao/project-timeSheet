
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserProfileComponent } from './user-profile.component';
import { EditUserProfileDialogComponent } from './edit-user-profile-dialog/edit-user-profile-dialog.component';


@NgModule({
  declarations: [UserProfileComponent,EditUserProfileDialogComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  entryComponents:[EditUserProfileDialogComponent],
})
export class UserProfileModule { }
