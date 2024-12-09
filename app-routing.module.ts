import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { GerarBoletoComponent } from './gerar-boleto/gerar-boleto.component';

const routes: Routes = [
  { path: '', component: MainComponent }, // Rota raiz renderiza o MainComponent
  { path: 'gerar-boleto', component: GerarBoletoComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Rota curinga redireciona para a raiz
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
