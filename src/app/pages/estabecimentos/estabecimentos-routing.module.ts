import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstabecimentosComponent } from './estabecimentos.component';

const routes: Routes = [
  {
    path: '',
    component: EstabecimentosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstabecimentosRoutingModule { }
