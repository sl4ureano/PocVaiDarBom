import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Debt } from '../models/debt.model';

@Component({
  selector: 'app-modal-parcelas',
  templateUrl: './modal-parcelas.component.html',
  styleUrls: ['./modal-parcelas.component.scss']
})
export class ModalParcelasComponent implements OnChanges {
  @Input() dividas: Debt[] = [];  // Inicializa como um array vazio
  @Input() vencimento: Date = new Date();
  @Output() fechar = new EventEmitter<{ dividas: Debt[], vencimento: Date, reload:boolean }>();

  // Variável que armazena as dívidas filtradas
  dividasSelecionadas: Debt[] = [];

  ngOnChanges() {
    // Filtra as dívidas selecionadas ao receber as mudanças
    this.filtrarDividas();

    // Se houver apenas uma dívida, marca ela automaticamente
    if (this.dividas.length === 1) {
      this.dividas[0].selecionada = true;
      this.dividasSelecionadas = [this.dividas[0]]; // Marca a dívida
      this.fechar.emit({ dividas: this.dividasSelecionadas, vencimento: this.vencimento, reload:false }); // Fecha o modal automaticamente
    }
  }

  // Método para filtrar as dívidas selecionadas
  filtrarDividas() {
    // Filtra as dívidas para pegar apenas as selecionadas
    this.dividasSelecionadas = this.dividas.filter(d => d.selecionada);
  }

  // Atualiza o carrinho quando as dívidas selecionadas mudam
  atualizarCarrinho() {
    this.fechar.emit({ dividas: this.dividasSelecionadas, vencimento: this.vencimento, reload:false });
  }

  // Salvar a seleção
  salvar() {
    this.atualizarCarrinho();
  }
}
