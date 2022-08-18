import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoBreadcrumbItem, PoNotificationService, PoSelectOption, PoTableAction, PoTableColumn, PoTableComponent, PoTableDetail } from '@po-ui/ng-components';
import { PoStorageService } from '@po-ui/ng-storage';

@Component({
  selector: 'app-fechar-pedido',
  templateUrl: './fechar-pedido.component.html',
  styleUrls: ['./fechar-pedido.component.scss']
})
export class FecharPedidoComponent implements OnInit {

  @ViewChild(PoTableComponent, { static: true })
  poTable!: PoTableComponent;

  breadcrumb: Array<PoBreadcrumbItem> = [
    { label: 'Home', action: this.backHome.bind(this) }, { label: 'Fechar pedido' }
  ]
  airfareDetail: PoTableDetail = {
    columns: [
      { property: 'id' },
      { property: 'nome' },
      { property: 'valor' },
      { property: 'quantidade' },
      { property: 'estabelecimento' }
    ],
    typeHeader: 'top'
  };
  columnsPedidos: Array<PoTableColumn> = [
    { property: 'id', visible: false },
    { property: 'nome' },
    {
      property: 'produtos',
      label: 'produtos',
      type: 'detail',
      detail: {
        columns: [
          { property: 'id' },
          { property: 'nome' },
          { property: 'valor' },
          { property: 'quantidade' },
          { property: 'estabelecimento' }
        ],
        typeHeader: 'top'
      }
    },
    { property: 'valor', type: 'currency' },
    { property: 'horario', type: 'time' },
    { property: 'data', type: 'date' },
    { property: 'estabelecimento', visible: false },
    { property: 'escolha', type: 'number', label: 'Quantas pediu' },
  ];

  clientes: Array<any> = []

  columns: PoTableColumn[] = [
    {
      property: 'id',
      visible: false
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
        { value: 'pediualgo', color: 'color-07', label: 'Pediu algo', content: 'PA' },
        { value: 'contafechada', color: 'color-12', label: 'Conta fechada', content: 'CF' },
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
    { action: this.fecharPedido.bind(this), icon: 'po-icon po-icon-finance-secure', label: '' },
  ];

  readonly statusOptions: Array<PoSelectOption> = [
    { label: 'Delivered', value: 'delivered' },
    { label: 'Transport', value: 'transport' },
    { label: 'Production', value: 'production' }
  ];

  id: any = '';

  fields = [
    {
      property: "pedidos"
    }
  ]

  constructor(
    private router: Router,
    private storage: PoStorageService,
    private notify: PoNotificationService
  ) { }

  ngOnInit(): void {
    this.getClientes();
  }


  getClientes() {
    this.storage.get('user').then((item) => {
      this.id = item;
    })

    this.storage.exists('clientes').then((res) => {
      if (res == true) {
        this.storage.get('clientes').then((items) => {
          this.clientes = items.filter((item: any) => item.status == 'pediualgo');
        })
      }
    })
  }

  isUndelivered(row: any, index: number) {
    return row.status !== 'delivered';
  }

  backHome(value: any) {
    this.router.navigate([`home/${this.id}`]);
  }


  excluirCliente() {

  }

  fecharPedido(item: any) {

    let dates = {
      horario: this.novaHora(),
      data: this.novaData()
    }

    this.storage.getItemByField('clientes', 'id', item.id).then((res) => {

      this.storage.removeItemFromArray('clientes', 'id', res.id).then((value) => {

        this.storage.appendItemToArray('clientes', {
          id: Math.floor(Date.now() * Math.random()).toString(36),
          nome: res.nome,
          whatsapp: res.whatsapp,
          estabelecimento: this.id,
          status: "contafechada",
          dividas: "regularizado",
          pedidos: [],
          valor_total: res.total
        }).then(() => {
          this.notify.success('Conta fechada com sucesso');
          this.getClientes();
        })
      })
    });
  }

  pad(s: any) {
    return (s < 10) ? '0' + s : s;
  }

  novaHora() {
    var date = new Date();
    return [date.getHours(), date.getMinutes(), date.getSeconds()].map(this.pad).join(':');
  }

  novaData() {
    var date = new Date();
    return [date.getDay(), date.getMonth(), date.getFullYear()].map(this.pad).join('/');
  }
}
