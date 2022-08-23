import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { HomeComponent } from './pages/home/home.component';
import { CommonModule } from '@angular/common';
import { PoStorageModule } from '@po-ui/ng-storage';
import { EstabecimentosComponent } from './pages/estabecimentos/estabecimentos.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { AddClienteComponent } from './pages/clientes/add-cliente/add-cliente.component';
import { EditClienteComponent } from './pages/clientes/edit-cliente/edit-cliente.component';
import { FecharPedidoComponent } from './pages/fechar-pedido/fechar-pedido.component';
import { EscolhaClienteComponent } from './components/escolha-cliente/escolha-cliente.component';
import { FazerPedidosComponent } from './pages/fazer-pedidos/fazer-pedidos.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { AdicionarProdutosComponent } from './pages/adicionar-produtos/adicionar-produtos.component';
import { ExportComponent } from './pages/export/export.component';
import { ImportDatasComponent } from './pages/import-datas/import-datas.component';
import { FingerprintAIO } from '@awesome-cordova-plugins/fingerprint-aio/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { EstabecimentosModule } from './pages/estabecimentos/estabecimentos.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EstabecimentosComponent,
    ClientesComponent,
    AddClienteComponent,
    EditClienteComponent,
    FecharPedidoComponent,
    EscolhaClienteComponent,
    FazerPedidosComponent,
    WelcomeComponent,
    AdicionarProdutosComponent,
    ExportComponent,
    ImportDatasComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    PoModule,
    RouterModule.forRoot([]),
    PoTemplatesModule,
    PoStorageModule.forRoot(),
    FormsModule,
    HttpClientModule,
    EstabecimentosModule
  ],
  exports:[
    AddClienteComponent,
    EditClienteComponent,
    EscolhaClienteComponent
  ],
  providers: [
    FingerprintAIO,
    AndroidPermissions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
