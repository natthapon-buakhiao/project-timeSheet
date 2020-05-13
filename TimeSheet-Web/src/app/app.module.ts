import { AddAttendanceDialogComponent } from './modules/attendance/add-attendance-dialog/add-attendance-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { noWhitespaceValidator } from './shared/noWhitespaceValidator';




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
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    SweetAlert2Module.forRoot(),
          
  ],
  providers: [
    noWhitespaceValidator
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
