import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PoBreadcrumbItem, PoButtonGroupItem, PoDialogService, PoStepperComponent, PoTableColumn, PoTableComponent, PoNotificationService } from '@po-ui/ng-components';
import { Router } from '@angular/router';
import { PoStorageService } from '@po-ui/ng-storage';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-fazer-pedidos',
  templateUrl: './fazer-pedidos.component.html',
  styleUrls: ['./fazer-pedidos.component.scss'],
  providers: [StorageService]
})
export class FazerPedidosComponent implements OnInit {

  @ViewChild(PoTableComponent, { static: true }) poTableProdutos!: PoTableComponent;
  @ViewChild(PoTableComponent, { static: true }) poTableClientes!: PoTableComponent;
  @ViewChild(PoStepperComponent) stepper!: PoStepperComponent;

  produtosDisponiveis: any[] = [];
  clientes!: Array<any>;

  columnsProdutos: Array<PoTableColumn> = [
    { property: 'id', visible: false },
    { property: 'nome' },
    { property: 'quantidade', label: 'Quantidade' },
    { property: 'valor', label: 'Valor' }
  ];

  id: any = '';
  clientSelected: boolean = false;
  productSelected: boolean = false;
  totalProdutos: any = 11;
  valorDosProdutos: Array<number> = []
  valorTotal: number = 0;
  @Input() itensCart: Array<any> = [];

  breadcrumb: Array<PoBreadcrumbItem> = [
    { label: 'Home', action: this.backHome.bind(this) }, { label: 'Fazer pedido' }
  ];
  countQuantity: number = 1;

  calculated: boolean = false;

  cliente_id: any = '';
  value_total: number = 1;

  constructor(
    private router: Router,
    private poStorage: PoStorageService,
    private storage: StorageService,
    private poDialog: PoDialogService,
    private notify: PoNotificationService
  ) { }

  ngOnInit() {
    this.calcularTotal();
    this.storage.getClientes().then((value) => {
      this.clientes = value
    });


    this.storage.getProdutos().then((value) => {
      this.produtosDisponiveis = value;
    });
    this.poStorage
  }

  retornarValorTotalEmString() {
    return this.countQuantity.toString();
  }


  //Função que valida se existe cliente selecionado e permite prosseguir no Step
  verificationClient(value: boolean) {
    return (this.clientSelected == false) ? false : true
  }

  //Função que valida se existe cliente selecionado e permite prosseguir no Step
  verificationProduct(value: boolean) {
    return (this.productSelected == false) ? false : true
  }

  //Botão de confirmar pedido
  confirmaPedido() {
    let dates = {
      horario: this.novaHora(),
      data: this.novaData()
    }

    this.poStorage.getItemByField('clientes', 'id', this.cliente_id).then((res) => {

      this.poStorage.removeItemFromArray('clientes', 'id', res.id).then((value) => {

        this.itensCart.forEach((item: any) => {
          item.horario = dates.horario;
          item.data = dates.data;
        });

        let new_prod = res.pedidos.concat(this.itensCart);
        this.id = Math.floor(Date.now() * Math.random()).toString(36)

        let c = {
          id: this.id,
          nome: res.nome,
          whatsapp: res.whatsapp,
          estabelecimento: this.id,
          status: "pediualgo",
          dividas: "regularizado",
          pedidos: new_prod,
          valor_total: this.calcularTotalPedidos(new_prod)
        }

        this.poStorage.appendItemToArray('clientes', c).then(() => {
          console.log('pedido salvo');
          console.log(c);

          this.notify.success('Pedido realizado com sucesso!');
          this.backHome();
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

  calcularTotalPedidos(pedido: any) {
    // calcula o total do pedido com base no valor dos produtos e quantidade
    let soma = 0;
    pedido.forEach((item: any) => {
      soma += (item.valor * item.escolha)
    })
    console.log(soma);
    return soma;
  }

  acresingQuantity(item: any) {
    this.value_total += item.valor;
    item.escolha++;
  }

  descreasingQuantity(item: any) {
    if (item.escolha > 1) {
      this.value_total -= item.valor;
      item.escolha--;
    }
  }

  calculateTotal() {
    this.poStorage.get('clientIDSelect').then((id) => {
      this.cliente_id = id;
      this.confirmaPedido();
    })

  }

  backHome() {
    this.router.navigate(['home', this.id])
  }

  //Botão de confirmar produtos do pedido
  confirmedItens() {
    const selectedProdutos = this.poTableProdutos.getSelectedRows();

    if (selectedProdutos.length > 0) {
      this.poDialog.confirm({
        title: 'Confirmar produtos',
        message: `Deseja adicionar ${selectedProdutos.length} produtos para o cliente?`,
        confirm: () => {
          this.poStorage.
            appendItemToArray('pedidos', selectedProdutos);
          this.productSelected = true;
          this.itensCart = selectedProdutos;
          this.calcularTotal();
          this.stepper.next();
        },
        cancel: () => {
          this.poStorage.remove('produtos');
        }
      });
    }
  }

  calcularTotal() {
    if (this.itensCart.length != 0) {
      this.valorDosProdutos = this.itensCart.map(p => p.valor)
      let soma = 0;
      soma = this.valorDosProdutos.reduce((soma, item) => { return soma + item })
      this.value_total = soma;
    }
    this.value_total;
  }

}
