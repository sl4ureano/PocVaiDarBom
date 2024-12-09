import { Component, Input } from '@angular/core';
import { Debt } from '../models/debt.model';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent {
  @Input() dividas: Debt[] = [];
  @Input() vencimento?: Date;

  // Calculando o valor total das dívidas selecionadas
  get valorTotal(): number {
    return this.dividas
      .filter(d => d.selecionada)
      .reduce((acc, divida) => acc + divida.valor, 0); // Soma os valores das dívidas selecionadas
  }

  // Calculando os juros com base no valor da dívida e na propriedade 'juros'
  get juros(): number {
    return this.dividas
      .filter(d => d.selecionada)
      .reduce((acc, divida) => acc + divida.juros, 0); // Soma os juros das dívidas selecionadas
  }

  // Valor total incluindo os juros
  get valorTotalComJuros(): number {
    return this.valorTotal + this.juros;
  }
}
