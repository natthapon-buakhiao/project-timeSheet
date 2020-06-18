import { MaterialElevationDirective } from './../MaterialElevation.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MandatoryfieldPipe } from './common/mandatoryfield.pipe';



@NgModule({
  declarations: [MandatoryfieldPipe, MaterialElevationDirective],
  imports: [
    CommonModule
  ],
  exports: [
    MandatoryfieldPipe,
    MaterialElevationDirective
  ]
})
export class SharedModule { }
