export type TipoOperacion = 'sumar' | 'restar' | 'multiplicar' | 'dividir';

export interface Operacion {
  id: string;
  tipo: TipoOperacion;
  a: number;
  b: number;
  resultado: number;
  createdAt: Date;
}


