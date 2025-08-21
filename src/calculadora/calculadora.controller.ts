import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { CalculadoraService } from './calculadora.service';
import { TipoOperacion } from './operacion';

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

  @Post('multiplicar')
  multiplicar(@Body() body: { a: number, b: number }) {
    return { resultado: this.calculadoraService.multiplicar(body.a, body.b) };
  }

  @Post('dividir')
  dividir(@Body() body: { a: number, b: number }) {
    return { resultado: this.calculadoraService.dividir(body.a, body.b) };
  }

  @Post('guardar')
  guardar(@Body() body: { tipo: TipoOperacion, a: number, b: number }) {
    return this.calculadoraService.guardar(body);
  }

  @Get('obtener/:id')
  obtener(@Param('id') id: string) {
    return this.calculadoraService.obtener(id);
  }

  @Delete('eliminar/:id')
  async eliminar(@Param('id') id: string) {
    await this.calculadoraService.eliminar(id);
    return { eliminado: true };
  }
}
