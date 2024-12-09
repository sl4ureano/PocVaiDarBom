// BusinessService

import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  private feriados: Date[] = []; // Mock de feriados

  constructor() {
    // Feriados Mock
    this.feriados = [new Date('2024-12-25'), new Date('2024-12-31')]; // Exemplo
  }

  getProximoDiaUtil(data: Date, feriados: Date[]): Date {
    let dia = new Date(data);
    do {
      dia.setDate(dia.getDate() + 1);
    } while (this.isFeriado(dia, feriados) || dia.getDay() === 0 || dia.getDay() === 6); // 0 = domingo, 6 = sábado
    return dia;
  }

  isDiaUtil(data: Date, feriados: Date[]): boolean {
    // Verifica se é um dia útil (não sábado, não domingo, e não feriado)
    return !(data.getDay() === 0 || data.getDay() === 6 || this.isFeriado(data, feriados));
  }

  isFeriado(dia: Date, feriados: Date[]): boolean {
    return feriados.some(feriado => feriado.toDateString() === dia.toDateString());
  }

  getFeriados(): Date[] {
    return this.feriados;
  }
}
