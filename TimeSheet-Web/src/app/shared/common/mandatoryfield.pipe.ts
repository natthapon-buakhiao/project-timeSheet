import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mandatoryfield'
})
export class MandatoryfieldPipe implements PipeTransform {

  transform(value: string): any {
    console.log(value);
    const str = 'Please enter a ' + value + '.';
    return str;
  }

}
