import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoBreadcrumb, PoNotificationService, PoSelectOption } from '@po-ui/ng-components';
import { PoStorageService } from '@po-ui/ng-storage';

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.scss']
})
export class EditClienteComponent implements OnInit {

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Clientes', link: '/clientes' }, { label: 'Editar Cliente', link: 'clientes' }]
  };

  id: any = ''
  name: string = '';
  whatsapp: string = '';
  statusSelected: string = ''
  dividasSelected: string = ''
  status: PoSelectOption[] = [
    {
      label: 'nao esta no bar',
      value: 'naoestanobar'
    },
    {
      label: 'pediu algo',
      value: 'pediualgo'
    },
    {
      label: 'fechar conta',
      value: 'contafechada'
    },
  ];

  dividas: PoSelectOption[] = [
    {
      label: 'regularizado',
      value: 'regularizado'
    },
    {
      label: 'pendente',
      value: 'pendente'
    },
    {
      label: 'devendo',
      value: 'devendo'
    },
  ];

  constructor(
    private router: Router,
    private storage: PoStorageService,
    private notify: PoNotificationService
  ) { }

  ngOnInit(): void {
    let id: string = this.router.url.split('/')[4].split('-').join(' ')

    this.storage.getItemByField('clientes', 'id', id).then((item) => {
      this.id = item.id;
      this.name = item.nome;
      this.whatsapp = item.whatsapp;

    })
  }
  statusChange(event: any) { this.statusSelected = event; }
  dividasChange(event: any) { this.dividasSelected = event; }

  save() {
    this.storage.removeItemFromArray('clientes', 'id', this.id).then(() => {

      this.storage.appendItemToArray('clientes', {
        id: Math.floor(Date.now() * Math.random()).toString(36),
        nome: this.name,
        whatsapp: this.whatsapp,
        estabelecimento: 234234,
        status: this.statusSelected,
        dividas: this.dividasSelected
      }).then(() => {
        this.notify.success('Cliente atualizado com sucesso!');
        this.router.navigate(['/clientes'])
      })
    })
  }
  cancel() {
    this.router.navigate(['/clientes'])
  }
}
