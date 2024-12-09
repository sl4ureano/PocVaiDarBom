import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { ModalDataComponent } from './modal-data/modal-data.component';
import { ModalParcelasComponent } from './modal-parcelas/modal-parcelas.component';
import { FormsModule } from '@angular/forms';
import { GerarBoletoComponent } from './gerar-boleto/gerar-boleto.component';
import { FullscreenmodalComponent } from './fullscreenmodal/fullscreenmodal.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CarrinhoComponent,
    ModalDataComponent,
    ModalParcelasComponent,
    GerarBoletoComponent,
    FullscreenmodalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
