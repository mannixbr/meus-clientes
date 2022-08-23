import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoBreadcrumbItem, PoNotificationService } from '@po-ui/ng-components';
import { PoDynamicField } from '@po-ui/ng-components/lib/components/po-dynamic/po-dynamic-field.interface';
import { PoStorageService } from '@po-ui/ng-storage';

@Component({
  selector: 'app-adicionar-produtos',
  templateUrl: './adicionar-produtos.component.html',
  styleUrls: ['./adicionar-produtos.component.scss']
})
export class AdicionarProdutosComponent implements OnInit {

  breadcrumb: Array<PoBreadcrumbItem> = [
    { label: 'Home', action: this.backHome.bind(this) }, { label: 'Adicionar Produto' }
  ];
  fields: Array<PoDynamicField> = [
    {
      property: 'nome'
    },
    {
      property: 'valor',
      type: 'number'
    },
    {
      property: 'quantidade',
      type: 'number'
    },
    {
      property: 'estabelecimento',
      visible: false
    },
    {
      property: 'escolha',
      visible: false,
      type: 'number'
    }
  ]

  id = '';

  constructor(
    private storage: PoStorageService,
    private router: Router,
    private notify: PoNotificationService
  ) { }

  ngOnInit(): void {
    this.id = this.router.url.split('/')[2]
  }

  saveProduto(event: any) {
    this.storage.appendItemToArray("produtos", {
      id: this.generateId(),
      nome: event.nome,
      valor: event.valor,
      quantidade: event.quantidade,
      estabelecimento: this.id,
      escolha: 1
    })
    // redirect to home
    this.notify.success('Produto adicionado com sucesso!')
    this.router.navigate(['/home', `${this.id}`]);
  }

  // generate id
  generateId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  backHome() {
    this.router.navigate([`/home/${this.id}`]);
  }
}
