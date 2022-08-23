import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/estabecimentos/estabecimentos.module').then(m => m.EstabecimentosModule)

  },
  {
    path: 'estabelecimentos',
    loadChildren: () => import('./pages/estabecimentos/estabecimentos.module').then(m => m.EstabecimentosModule)
  },
  {
    path: 'addProdutos',
    loadChildren: () => import('./pages/adicionar-produtos/adicionar-produtos.module').then(m => m.AdicionarProdutosModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./pages/clientes/clientes.module').then(
      m => m.ClientesModule
    )
  },
  {
    path: 'fecharPedido',
    loadChildren: () => import('./pages/fechar-pedido/fechar-pedido.module').then(m => m.FecharPedidoModule)
  },
  {
    path: 'fazer-pedido',
    loadChildren: () => import('./pages/fazer-pedidos/fazer-pedidos.module').then(m => m.FazerPedidosModule)
  },
  {
    path: 'export',
    loadChildren: () => import('./pages/export/export.module').then(m => m.ExportModule)
  },
  {
    path: 'importDatas',
    loadChildren: () => import('./pages/import-datas/import-datas.module').then(m => m.ImportDatasModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
