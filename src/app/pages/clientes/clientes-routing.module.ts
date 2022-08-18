import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClienteComponent } from './add-cliente/add-cliente.component';
import { ClientesComponent } from './clientes.component';
import { EditClienteComponent } from './edit-cliente/edit-cliente.component';

const routes: Routes = [
  {
    path: '',
    component: ClientesComponent
  },
  {
    path: ':id',
    component: ClientesComponent
  },
  {
    path: ':id/add-cliente',
    component: AddClienteComponent
  },
  {
    path: ':item/edit-cliente/:id',
    component: EditClienteComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
