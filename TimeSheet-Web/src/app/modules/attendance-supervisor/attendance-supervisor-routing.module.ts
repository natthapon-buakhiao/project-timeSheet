import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttendanceSupervisorComponent } from './attendance-supervisor.component';


const routes: Routes = [{ path: '', component: AttendanceSupervisorComponent },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceSupervisorRoutingModule { }
