import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { MaterialModule } from '../material.module';
import { AppLayoutComponent } from './app-layout/app-layout.component';


@NgModule({
  declarations: [AppLayoutComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MaterialModule,

  ]
})
export class CoreModule { }
