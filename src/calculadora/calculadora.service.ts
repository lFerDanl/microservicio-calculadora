import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { OperacionesRepository } from './operaciones.repository';
import { Operacion, TipoOperacion } from './operacion';

@Injectable()
export class CalculadoraService {
  constructor(private readonly operacionesRepository: OperacionesRepository) {}

  sumar(a: number, b: number): number {
    return a + b;
  }

  restar(a: number, b: number): number {
    return a - b;
  }

  multiplicar(a: number, b: number): number {
    return a * b;
  }

  dividir(a: number, b: number): number {
    return a / b;
  }

  private calcular(tipo: TipoOperacion, a: number, b: number): number {
    switch (tipo) {
      case 'sumar':
        return this.sumar(a, b);
      case 'restar':
        return this.restar(a, b);
      case 'multiplicar':
        return this.multiplicar(a, b);
      case 'dividir':
        return this.dividir(a, b);
      default:
        throw new BadRequestException('Tipo de operación no soportado');
    }
  }

  async guardar(input: { tipo: TipoOperacion; a: number; b: number }): Promise<Operacion> {
    const { tipo, a, b } = input;
    const resultado = this.calcular(tipo, a, b);
    return this.operacionesRepository.create({ tipo, a, b, resultado });
  }

  async obtener(id: string): Promise<Operacion> {
    const operacion = await this.operacionesRepository.findById(id);
    if (!operacion) {
      throw new NotFoundException('Operación no encontrada');
    }
    return operacion;
  }

  async eliminar(id: string): Promise<void> {
    const deleted = await this.operacionesRepository.deleteById(id);
    if (!deleted) {
      throw new NotFoundException('Operación no encontrada');
    }
  }
}
