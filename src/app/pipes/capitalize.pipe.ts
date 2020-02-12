import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'capitalizeFirst'})
export class CapitalizeFirstPipe implements PipeTransform {
  transform(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
