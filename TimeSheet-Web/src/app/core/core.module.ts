import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { MaterialModule } from '../material.module';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AppNevBarComponent } from './app-nev-bar/app-nev-bar.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [AppLayoutComponent, AppNevBarComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MaterialModule,
    NgxSpinnerModule

  ]
})
export class CoreModule { }
