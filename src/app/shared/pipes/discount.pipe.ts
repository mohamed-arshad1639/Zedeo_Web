import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount'
})
export class DiscountPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const price = args.offer ? args.price - (args.price * args.offer  / 100) : args.price;
    return price
  }

}
