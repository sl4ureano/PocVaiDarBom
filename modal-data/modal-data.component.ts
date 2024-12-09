import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { BusinessService } from '../services/business.service';
import { Debt } from '../models/debt.model';

@Component({
  selector: 'app-modal-data',
  templateUrl: './modal-data.component.html',
  styleUrls: ['./modal-data.component.scss']
})
export class ModalDataComponent implements OnInit {
  @Input() hoje: Date = new Date();
  @Input() feriados: Date[] = [];
  @Output() fechar = new EventEmitter<void>();
  @Output() salvar = new EventEmitter<{ dividas: Debt[], vencimento: Date, reload:boolean }>();
  @Input() dividasSelecionadas: Debt[] = [];  // Dívidas selecionadas do MainComponent

  proximoDiaUtil?: Date;
  vencimento?: Date;

  constructor(private businessService: BusinessService) {}

  ngOnInit() {
    this.definirVencimento();  // Chama o método para definir a data de vencimento inicial
  }

  // Método para definir a data de vencimento
  definirVencimento() {
    // Se "hoje" for um dia útil, usamos hoje. Caso contrário, usamos o próximo dia útil.
    if (this.businessService.isDiaUtil(this.hoje, this.feriados)) {
      this.vencimento = this.hoje;
    } else {
      this.vencimento = this.businessService.getProximoDiaUtil(this.hoje, this.feriados);
    }
    // Calcula o próximo dia útil para poder usá-lo mais tarde
    this.proximoDiaUtil = this.businessService.getProximoDiaUtil(this.hoje, this.feriados);
  }

  salvarData() {
    // Verificar se a data selecionada não é um dia útil
    if (this.vencimento === this.hoje && (this.hoje.getDay() === 0 || this.hoje.getDay() === 6 || this.businessService.isFeriado(this.hoje, this.feriados))) {
      alert('Hoje não é um dia útil. O vencimento será alterado para o próximo dia útil.');
      this.vencimento = this.proximoDiaUtil;  // Ajusta para o próximo dia útil
    }

    // Emitir evento com a data de vencimento ajustada
    this.salvar.emit({ dividas: this.dividasSelecionadas, vencimento: this.vencimento!, reload:true });
    this.fechar.emit();
  }

  mudarData() {
    // Emitir evento com a nova data de vencimento
    this.salvar.emit({ dividas: this.dividasSelecionadas, vencimento: this.vencimento!, reload:true });
  }
}
