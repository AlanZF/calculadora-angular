import { Component, OnInit } from '@angular/core';

import { CalculadoraService } from '../services';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {

  private num1: string;
  private num2: string;
  private operation: string;
  private result: number;

  constructor(private calculadoraService: CalculadoraService) {

  }

  ngOnInit(): void {
    this.clear();
  }

  clear(): void {
    this.num1 = '0';
    this.num2 = null;
    this.operation = null;
    this.result = null;
  }

  /* No método abaixo, se não foi digitado um símbolo de operação, ou
  se foi digitado e logo após digitados dois números em sequência,
  os números digitados serão concatenados em sequência para formar um
  número de mais de um dígito*/
  addNumber(num: string): void {
    if (this.operation === null) {
      this.num1 = this.concatenateNumber(this.num1, num);
    } else {
      this.num2 = this.concatenateNumber(this.num2, num);
    }
  }

  concatenateNumber(numCurrent: string, numConcat: string): string {
    if (numCurrent === '0' || numCurrent === null) {
      numCurrent = '';
    }

    if (numConcat === '.' && numCurrent === '') {
      return '0.';
    }

    if (numConcat === '.' && numCurrent.indexOf('.') > -1) {
      return numCurrent;
    }
    return numCurrent + numConcat;
  }

  performOperation(operation: string): void {
    if (this.operation === null) {
      this.operation = operation;
      return;
    }

    if (this.num2 !== null) {
      this.result = this.calculadoraService.calculate(
        parseFloat(this.num1),
        parseFloat(this.num2),
        this.operation);

      this.operation = operation;
      this.num1 = this.result.toString();
      this.num2 = null;
      this.result = null;
    }
  }

  /* Método para o botão de igual */
  calculate(): void {
    if (this.num2 === null) {
      return;
    }

    this.result = this.calculadoraService.calculate(
      parseFloat(this.num1),
      parseFloat(this.num2),
      this.operation);
  }

  /* Método que exibirá as informações na tela */
  get display(): string {
    if (this.result !== null) {
      return this.result.toString();
    }
    if (this.num2 !== null) {
      return this.num2;
    }
    return this.num1;
  }
}