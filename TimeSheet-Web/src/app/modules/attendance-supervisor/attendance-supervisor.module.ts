import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceSupervisorRoutingModule } from './attendance-supervisor-routing.module';
import { AttendanceSupervisorComponent } from './attendance-supervisor.component';
import { MaterialModule } from 'src/app/material.module';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';





@NgModule({
  declarations: [AttendanceSupervisorComponent],
  imports: [
    CommonModule,
    AttendanceSupervisorRoutingModule,
    MaterialModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,

  ],

})
export class AttendanceSupervisorModule { }
