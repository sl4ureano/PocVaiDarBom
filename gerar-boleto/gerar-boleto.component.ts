import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Debt } from '../models/debt.model';

@Component({
  selector: 'app-gerar-boleto',
  templateUrl: './gerar-boleto.component.html',
  styleUrls: ['./gerar-boleto.component.scss']
})
export class GerarBoletoComponent implements OnInit {
  dividasSelecionadas: Debt[] = [];
  vencimento: Date = new Date();
  contrato: string = '';
  total: number = 0;
  jurosTotal: number = 0;
  totalComJuros: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Recuperar dados da navegação
    const navigation = this.route.snapshot.paramMap.get('dados');
    if (navigation) {
      const { dividas, vencimento, contrato } = JSON.parse(navigation);
      this.dividasSelecionadas = dividas;
      this.vencimento = vencimento;
      this.contrato = contrato
      this.total = this.calcularTotal();
      this.jurosTotal = this.calcularJurosTotal();
      this.totalComJuros = this.total + this.jurosTotal;
    }
  }

  calcularTotal(): number {
    return this.dividasSelecionadas.reduce((acc, divida) => acc + divida.valor, 0);
  }

  calcularJurosTotal(): number {
    return this.dividasSelecionadas.reduce((acc, divida) => acc + (divida.juros || 0), 0);
  }

  gerarBoleto(){
    alert('Boleto gerado com sucesso!')
  }

}
