import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FecharPedidoComponent } from './fechar-pedido.component';

const routes: Routes = [
  {
    path: '',
    component: FecharPedidoComponent
  },
  {
    path: ':id',
    component: FecharPedidoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FecharPedidoRoutingModule { }
