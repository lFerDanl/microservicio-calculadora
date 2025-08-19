import { Controller, Post, Body } from '@nestjs/common';
import { CalculadoraService } from './calculadora.service';

@Controller('calculadora')
export class CalculadoraController {
  constructor(private readonly calculadoraService: CalculadoraService) {}

  @Post('sumar')
  sumar(@Body() body: { a: number, b: number }) {
    return { resultado: this.calculadoraService.sumar(body.a, body.b) };
  }

  @Post('restar')
  restar(@Body() body: { a: number, b: number }) {
    return { resultado: this.calculadoraService.restar(body.a, body.b) };
  }
}
