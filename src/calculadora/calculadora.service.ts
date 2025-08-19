import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculadoraService {
  sumar(a: number, b: number): number {
    return a + b;
  }

  restar(a: number, b: number): number {
    return a - b;
  }
}
