import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExportComponent } from './export.component';

const routes: Routes = [
  {
    path: '',
    component: ExportComponent
  },
  {
    path: ':id',
    component: ExportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExportRoutingModule { }
