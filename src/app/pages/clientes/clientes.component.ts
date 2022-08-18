import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoBreadcrumb, PoBreadcrumbItem, PoInfoOrientation, PoNotificationService, PoTableAction, PoTableColumn, PoTableComponent } from '@po-ui/ng-components';
import { PoStorageService } from '@po-ui/ng-storage';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  @ViewChild(PoTableComponent, { static: true })
  poTable!: PoTableComponent;

  breadcrumb: Array<PoBreadcrumbItem> = [
    { label: 'Home', action: this.backHome.bind(this) }, { label: 'Clientes' }
  ]

  clientes: Array<any> = []

  columns: PoTableColumn[] = [
    {
      property: 'id'
    },
    {
      property: 'nome'
    },
    {
      property: 'valor_total'
    },
    {
      property: 'whatsapp'
    },
    {
      property: 'estabelecimento'
    },
    {
      property: 'status',
      type: 'subtitle',
      subtitles: [
        { value: 'naoestanobar', color: 'color-01', label: 'Nao esta no bar', content: 'ESB' },
        { value: 'pediualgo', color: 'color-07', label: 'Pediu algo', content: 'NS' },
        { value: 'contafechada', color: 'color-07', label: 'Conta fechada', content: 'NS' },
      ]
    },
    {
      property: 'dividas',
      type: 'label',
      labels: [
        { value: 'regularizado', color: 'color-11', label: 'Regularizado' },
        { value: 'pendente', color: 'color-08', label: 'Pendednte' },
        { value: 'devendo', color: 'color-07', label: 'Devendo' }
      ]
    },
  ]

  actions: Array<PoTableAction> = [
    { action: this.editar.bind(this), icon: 'po-icon-info', label: 'Editar' },
    { action: this.remove.bind(this), icon: 'po-icon po-icon-delete', label: 'Remover' }
  ];

  id: any = '';

  constructor(
    private router: Router,
    private storage: PoStorageService,
    private notify: PoNotificationService
  ) { }

  ngOnInit(): void {

    this.storage.get('user').then((item) => {
      this.id = item;
    })

    this.storage.exists('clientes').then((res) => {
      if (res == true) {
        this.storage.get('clientes').then((items) => {
          this.clientes = items;

        })
      }
    })
  }

  backHome() {
    this.router.navigate([`home/${this.id}`]);
  }

  remove(item: any) {
    this.storage.removeItemFromArray('clientes', 'id', item.id).then((res) => {
      this.poTable.removeItem(item);
      this.notify.success('Cliente removido com sucesso!');
    })
  }
  
  discount() { }
  validateDiscount() { }

  editar(item: any) {
    this.router.navigate([`clientes/${this.id}/edit-cliente`, item.id]);
  }

  addCliente() {
    this.router.navigate([`clientes/${this.id}/add-cliente`]);
  }

}
