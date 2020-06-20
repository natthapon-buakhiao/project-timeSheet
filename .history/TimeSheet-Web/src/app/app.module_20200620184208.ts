import { SharedModule } from './shared/shared.module';
import { AddAttendanceDialogComponent } from './modules/attendance/add-attendance-dialog/add-attendance-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { noWhitespaceValidator } from './shared/noWhitespaceValidator';
import { InterceptorService } from './service/interceptor.service';
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { AppDateAdapter, APP_DATE_FORMATS} from './shared/common/date.adapter';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';



@NgModule({
  declarations: [
    AppComponent,
    AddAttendanceDialogComponent
    
  ],
  entryComponents:[AddAttendanceDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,BsDatepickerModule
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    SweetAlert2Module.forRoot(),
    CommonModule,
    SharedModule,
    NgxSpinnerModule,
    
          
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    noWhitespaceValidator,
    {
      provide: DateAdapter, useClass: AppDateAdapter
  },
  {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
  }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
