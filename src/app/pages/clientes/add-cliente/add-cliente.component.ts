import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoBreadcrumb, PoNotificationService } from '@po-ui/ng-components';
import { PoStorageService } from '@po-ui/ng-storage';

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.scss']
})
export class AddClienteComponent {

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Clientes', link: '/clientes' }, { label: 'Criar Cliente', link: 'clientes' }]
  };

  name: string = '';
  whatsapp: string = '';

  constructor(
    private router: Router,
    private storage: PoStorageService,
    private notify: PoNotificationService
  ) { }


  save() {
    this.storage.appendItemToArray('clientes', {
      id: Math.floor(Date.now() * Math.random()).toString(36),
      nome: this.name,
      whatsapp: this.whatsapp,
      estabelecimento: 234234,
      status: "naoestanobar",
      dividas: "regularizado",
      pedidos: [],
      valor_total: 0
    }).then(() => {
      this.notify.success('Cliente criado com sucesso!');
      this.router.navigate(['/clientes'])

    })
  }
  cancel() {
    this.router.navigate(['/clientes'])
  }

}
