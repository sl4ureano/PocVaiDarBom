// debt.model.ts
export interface Debt {
  id: string;
  descricao: string;
  valor: number;
  juros: number; // juros em reais
  selecionada: boolean;
}
