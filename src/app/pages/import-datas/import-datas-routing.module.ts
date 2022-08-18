import { ImportDatasComponent } from './import-datas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ImportDatasComponent
  },
  {
    path: ':id',
    component: ImportDatasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportDatasRoutingModule { }
