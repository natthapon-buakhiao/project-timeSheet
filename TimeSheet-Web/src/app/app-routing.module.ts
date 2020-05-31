import { AppNevBarComponent } from './core/app-nev-bar/app-nev-bar.component';
import { AppLayoutComponent } from './core/app-layout/app-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthguardService } from './service/authguard.service';


const routes: Routes = [
  {
    path: '',
    component: AppNevBarComponent,
    children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},   
    { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)},
    { path: 'attendance', loadChildren: () => import('./modules/attendance/attendance.module').then(m => m.AttendanceModule)},
    { path: 'user-profile', loadChildren: () => import('./modules/user-profile/user-profile.module').then(m => m.UserProfileModule)},
    { path: 'attendance/user-profile', loadChildren: () => import('./modules/user-profile/user-profile.module').then(m => m.UserProfileModule)},
    { path: 'supervisor', loadChildren: () => import('./modules/attendance-supervisor/attendance-supervisor.module').then(m => m.AttendanceSupervisorModule)},
    { path: 'supervisor/user-profile', loadChildren: () => import('./modules/user-profile/user-profile.module').then(m => m.UserProfileModule)},
    { path: 'user-project', loadChildren: () => import('./modules/user-project/user-project.module').then(m => m.UserProjectModule)},
    { path: 'report', loadChildren: () => import('./modules/report/report.module').then(m => m.ReportModule)},
    { path: 'list-staff', loadChildren: () => import('./modules/list-staff/list-staff.module').then(m => m.ListStaffModule)},


    
  ],
  canActivate: [AuthguardService]
},
{
  path: '',
  component: AppLayoutComponent,
  children: [
        { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
      ],
    }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
