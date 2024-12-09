import { Observable, of } from "rxjs";
import { Debt } from "../models/debt.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DebtService {

  constructor() {}

  getDebts(data: Date, numeroContrato: string): Observable<Debt[]> {
    console.log(data)
    // Cria um mock de dívidas baseado nas datas
    const dividas: Debt[] = this.criarMockDeDividas(data);
    return of(dividas); // Retorna como observable
  }

  private criarMockDeDividas(data: Date): Debt[] {
    data = new Date(data)
    const dividas: Debt[] = [];

    // Mock para o dia atual (hoje) com 1 parcela
    if (data.getDate() === 9) {
      dividas.push(
        { id: '1', descricao: 'Parcela 1', valor: 100, juros: 15, selecionada: false }
      );
    }
    // Mock para o dia 09 com 2 parcelas
    else if (data.getDate() === 10) {
      dividas.push(
        { id: '1', descricao: 'Parcela 1', valor: 100, juros: 15, selecionada: false },
        { id: '2', descricao: 'Parcela 2', valor: 150, juros: 25, selecionada: false }
      );
    }

    return dividas;
  }
}
