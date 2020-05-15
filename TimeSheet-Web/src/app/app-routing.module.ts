import { AppLayoutComponent } from './core/app-layout/app-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthguardService } from './service/authguard.service';


const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    // { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
    { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)},
    { path: 'attendance', loadChildren: () => import('./modules/attendance/attendance.module').then(m => m.AttendanceModule)},
    { path: 'user-profile', loadChildren: () => import('./modules/user-profile/user-profile.module').then(m => m.UserProfileModule)},
    { path: 'attendance/user-profile', loadChildren: () => import('./modules/user-profile/user-profile.module').then(m => m.UserProfileModule)},
    { path: 'supervisor', loadChildren: () => import('./modules/attendance-supervisor/attendance-supervisor.module').then(m => m.AttendanceSupervisorModule)},
    { path: 'supervisor/user-profile', loadChildren: () => import('./modules/user-profile/user-profile.module').then(m => m.UserProfileModule)},
    
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
