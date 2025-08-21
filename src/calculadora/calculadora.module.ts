import { Module } from '@nestjs/common';
import { CalculadoraService } from './calculadora.service';
import { CalculadoraController } from './calculadora.controller';
import { OperacionesRepository } from './operaciones.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CalculadoraService, OperacionesRepository],
  controllers: [CalculadoraController]
})
export class CalculadoraModule {}

