import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdicionarProdutosComponent } from './adicionar-produtos.component';

const routes: Routes = [
  {
    path: '',
    component: AdicionarProdutosComponent
  },
  {
    path: ':id',
    component: AdicionarProdutosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdicionarProdutosRoutingModule { }
