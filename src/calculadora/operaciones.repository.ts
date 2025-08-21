import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { Operacion, TipoOperacion } from './operacion';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OperacionesRepository {
  private readonly operaciones = new Map<string, Operacion>();

  constructor(private readonly prisma: PrismaService) {}

  async create(input: { tipo: TipoOperacion; a: number; b: number; resultado: number }): Promise<Operacion> {
    if (this.prisma.isEnabled()) {
      const created = await (this.prisma as any).operacion.create({
        data: { tipo: input.tipo, a: input.a, b: input.b, resultado: input.resultado },
      });
      return { id: created.id, tipo: created.tipo as TipoOperacion, a: created.a, b: created.b, resultado: created.resultado, createdAt: created.createdAt };
    }
    const id = randomUUID();
    const operacion: Operacion = {
      id,
      tipo: input.tipo,
      a: input.a,
      b: input.b,
      resultado: input.resultado,
      createdAt: new Date(),
    };
    this.operaciones.set(id, operacion);
    return operacion;
  }

  async findById(id: string): Promise<Operacion | undefined> {
    if (this.prisma.isEnabled()) {
      const found = await (this.prisma as any).operacion.findUnique({ where: { id } });
      if (!found) return undefined;
      return { id: found.id, tipo: found.tipo as TipoOperacion, a: found.a, b: found.b, resultado: found.resultado, createdAt: found.createdAt };
    }
    return this.operaciones.get(id);
  }

  async deleteById(id: string): Promise<boolean> {
    if (this.prisma.isEnabled()) {
      try {
        await (this.prisma as any).operacion.delete({ where: { id } });
        return true;
      } catch {
        return false;
      }
    }
    return this.operaciones.delete(id);
  }
}


