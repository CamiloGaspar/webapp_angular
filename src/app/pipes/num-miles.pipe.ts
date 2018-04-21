import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numMiles'
})
export class NumMilesPipe implements PipeTransform {

  transform(value: number | string, locale?: string): string {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0
    }).format(Number(value));
  }

}
