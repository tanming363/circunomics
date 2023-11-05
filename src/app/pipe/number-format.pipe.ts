import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat',
  standalone: true,
})
export class NumberFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (value >= 1000 && value < 1000000) {
      return (value / 1000).toFixed(1) + 'k';
    } else if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    } else {
      return value.toString();
    }
  }
}
