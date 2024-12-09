import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-fullscreenmodal',
  templateUrl: './fullscreenmodal.component.html',
  styleUrls: ['./fullscreenmodal.component.scss']
})
export class FullscreenmodalComponent {

  @Input() aberto: boolean = false; // Define se o modal está aberto
  @Output() fechar = new EventEmitter<void>(); // Evento para notificar o fechamento do modal

  fecharModal() {
    this.fechar.emit(); // Emite o evento de fechar para o componente pai
  }

}


