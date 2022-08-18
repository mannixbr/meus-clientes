import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FazerPedidosComponent } from './fazer-pedidos.component';

const routes: Routes = [
  {path:'', component: FazerPedidosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FazerPedidosRoutingModule { }
