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
          
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
