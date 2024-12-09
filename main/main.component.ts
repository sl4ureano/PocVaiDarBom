import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../services/business.service';
import { DebtService } from '../services/debt.service';
import { Debt } from '../models/debt.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  dividas: Debt[] = [];
  dividasSelecionadas: Debt[] = [];
  vencimento: Date = new Date();  // Data inicial como a data atual
  hoje: Date = new Date("2024-12-09T12:34:56")

  feriados: Date[] = [];
  modalDataAberto: boolean = false;
  modalParcelasAberto: boolean = false;
  contrato:string = ''


  modalAberto: boolean = false;


  constructor(
    private businessService: BusinessService,
    private debtService: DebtService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarFeriados();
  }

  carregarFeriados() {
    this.obterContrato()
    this.feriados = this.businessService.getFeriados();
    this.definirVencimento();
    this.carregarDividas();
  }

  obterContrato() {
    this.contrato = '123456'
  }

  // Método para definir a data de vencimento
  definirVencimento() {
    if (this.businessService.isDiaUtil(this.hoje, this.feriados)) {
      this.vencimento = this.hoje;  // Se hoje for dia útil, usa hoje
    } else {
      this.vencimento = this.businessService.getProximoDiaUtil(this.hoje, this.feriados);  // Caso contrário, usa o próximo dia útil
    }
  }

  carregarDividas() {
    this.debtService.getDebts(this.vencimento, this.contrato).subscribe(dividas => {
      this.dividas = dividas;
      this.dividasSelecionadas = dividas.filter(d => d.selecionada);

      // Se houver apenas uma dívida, marca automaticamente e fecha o modal
      if (this.dividas.length === 1) {
        this.dividas[0].selecionada = true;
        this.dividasSelecionadas = [this.dividas[0]];
        this.modalParcelasAberto = false;  // Fecha automaticamente o modal
      }
      // Se houver duas dívidas, marca ambas e abre o modal de parcelas
      else if (this.dividas.length === 2) {
        this.dividas[0].selecionada = true;
        this.dividas[1].selecionada = true;
        this.dividasSelecionadas = [this.dividas[0], this.dividas[1]];
        this.modalParcelasAberto = false;  // Abre o modal de parcelas
      }
      // Caso contrário, mantém o modal fechado
      else {
        this.modalParcelasAberto = false;
      }
    });
  }

  abrirModalData() {
    this.modalDataAberto = true;
  }

  abrirModalParcelas() {
    if (this.dividas.length > 1) {
      this.modalParcelasAberto = true;
    }
  }

  // Método chamado quando a data ou as dívidas são selecionadas
  confirmarSelecao(dados: { dividas: Debt[], vencimento: Date, reload:boolean }) {
    if(dados){
      this.dividasSelecionadas = dados?.dividas;
      this.vencimento = dados?.vencimento;
      // Recarrega as dívidas com a nova data
      if(dados?.reload)
        this.carregarDividas();
    }
    this.modalParcelasAberto = false;
  }

  continuar() {
    // Navegar para a tela de gerar boleto e passar os dados como parâmetro
    this.router.navigate(['/gerar-boleto', {
      dados: JSON.stringify({ dividas: this.dividasSelecionadas, vencimento: this.vencimento, contrato: this.contrato })
    }]);
  }






  abrirModal() {
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }
}
