import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {

  readonly SUM: string = '+';
  readonly SUBTRACTION: string = '-';
  readonly DIVISION: string = '/';
  readonly MULTIPLICATION: string = '*';

  constructor() { }

  calculate(num1: number, num2: number, operation: string) {
    let result: number;

    switch (operation) {
      case this.SUM:
        result = num1 + num2;
        break;
      case this.SUBTRACTION:
        result = num1 - num2;
        break;
      case this.DIVISION:
        result = num1 / num2;
        break;
      case this.MULTIPLICATION:
        result = num1 * num2;
        break;
      default:
        result = 0;
    }
    return result;
  }
}
